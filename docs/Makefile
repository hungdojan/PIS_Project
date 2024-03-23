NAME=architecture
TARGET=xdohun00

.PHONY: all pack clean run

all: $(TARGET)

run:
	podman run --rm -it -v .:/data blang/latex:latest make

$(TARGET): $(NAME).tex
	pdflatex -jobname=$@ $<

clean:
	rm -f *.{aux,out,log,ps,dvi,toc} *.zip $(TARGET).pdf
