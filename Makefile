VERSION = $(shell sed -n  's/^  "version": "\([^"]\+\).*/\1/p' manifest.json)
FILES = $(shell git ls-files)

discard-tab-$(VERSION).zip: $(FILES)
	zip $@ $^ --exclude Makefile --exclude README.md
