
NODE = node

benchmark:
	@node benchmarks/bm.js enumerable

test:
	@$(NODE) spec/node.js

.PHONY: test benchmark

