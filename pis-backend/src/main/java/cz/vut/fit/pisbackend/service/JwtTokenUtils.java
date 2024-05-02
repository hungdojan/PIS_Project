package cz.vut.fit.pisbackend.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.ECDSASigner;
import com.nimbusds.jose.crypto.ECDSAVerifier;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jose.jwk.Curve;
import com.nimbusds.jose.jwk.ECKey;
import com.nimbusds.jose.jwk.KeyUse;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.gen.ECKeyGenerator;
import com.nimbusds.jose.jwk.gen.RSAKeyGenerator;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import cz.vut.fit.pisbackend.data.Employee;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.Objects;
import java.util.Properties;
import java.util.UUID;

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
        final JWSSigner singer = new MACSigner(getSecretKey());
        final JWSHeader.Builder headerBuilder = new JWSHeader.Builder(JWSAlgorithm.HS256);

        final long currTime = System.currentTimeMillis();
        final long expirationTime = currTime + (1000 * 3600);   // 1 hour
        final var clamsSetBuilder = new JWTClaimsSet.Builder()
            .subject(employee.getLogin())
            .issuer("RestauraceStaryPivovar")
            .issueTime(new Date(currTime))
            .expirationTime(new Date(expirationTime))
            .claim("role", employee.getRole())
            .claim("login", employee.getLogin());

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
