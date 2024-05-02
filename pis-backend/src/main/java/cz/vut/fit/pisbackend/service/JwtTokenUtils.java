package cz.vut.fit.pisbackend.service;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import cz.vut.fit.pisbackend.data.Employee;

import java.io.FileInputStream;
import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.Objects;
import java.util.Properties;

public class JwtTokenUtils {

    public static String getSecretKey() throws IOException {
        String rootPath = Objects.requireNonNull(
            Thread.currentThread().getContextClassLoader().getResource("")
        ).getPath();
        String appConfigPath = rootPath + "secrets";

        Properties appProps = new Properties();
        appProps.load(new FileInputStream(appConfigPath));
        return appProps.getProperty("secret_key");
    }

    public static SignedJWT generateASignedJwt(Employee employee) throws IOException, JOSEException {
        return generateASignedJwt(employee.getLogin(), employee.getRole());
    }

    public static SignedJWT generateASignedJwt(String login, String role) throws IOException, JOSEException {
        final JWSSigner singer = new MACSigner(getSecretKey());
        final JWSHeader.Builder headerBuilder = new JWSHeader.Builder(JWSAlgorithm.HS256);

        final long currTime = System.currentTimeMillis();
        final long expirationTime = currTime + (1000 * 3600);   // 1 hour
        final var clamsSetBuilder = new JWTClaimsSet.Builder()
            .subject(login)
            .issuer("RestauraceStaryPivovar")
            .issueTime(new Date(currTime))
            .expirationTime(new Date(expirationTime))
            .claim("role", role)
            .claim("login", login);

        final SignedJWT signedJWT = new SignedJWT(
            headerBuilder.build(),
            clamsSetBuilder.build()
        );
        signedJWT.sign(singer);
        return signedJWT;
    }

    public static String signedJwtToString(final SignedJWT signedJWT) {
        return signedJWT.serialize();
    }

    public static SignedJWT stringToSignedJwt(final String serializedJwt) throws ParseException {
        return SignedJWT.parse(serializedJwt);
    }

    public static boolean validateJwt(String serializedJwt) throws IOException, ParseException, JOSEException {
        SignedJWT signedJWT = SignedJWT.parse(serializedJwt);
        return signedJWT.verify(new MACVerifier(getSecretKey()));
    }

    public static JWTClaimsSet getClaimSet(final SignedJWT signedJWT) throws ParseException {
        return signedJWT.getJWTClaimsSet();
    }

    public static String jwtGetLoginValue(final String jwtToken) throws ParseException {
        return getClaimSet(stringToSignedJwt(jwtToken)).getStringClaim("login");
    }

    public static String jwtGetRoleValue(final String jwtToken) throws ParseException {
        return getClaimSet(stringToSignedJwt(jwtToken)).getStringClaim("value");
    }
}
