NAME=architecture
TARGET=$(NAME).pdf

.PHONY: all pack clean run

all: $(TARGET)

run:
	podman run --rm -it -v .:/data blang/latex:latest make

$(TARGET): $(NAME).tex
	pdflatex $<

clean:
	rm -f $(NAME).{aux,out,log,pdf,ps,dvi,toc} *.zip
