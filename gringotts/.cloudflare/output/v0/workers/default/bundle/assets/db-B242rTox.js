import { d as TSS_SERVER_FUNCTION, t as createServerFn, v as __commonJSMin } from "./createServerFn-TpCK4c9B.js";
import { c as Month, d as getMonthNumber, i as Category, l as Tag, o as Group, r as Bool, s as Groups, t as Account } from "./Types-Ci0UbdzN.js";
import { env } from "cloudflare:workers";
import * as m from "stream";
//#region node_modules/.pnpm/@tanstack+start-server-core@1.169.30/node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/lib/ImportRules.ts
var rules = [{
	match: (tx) => tx.account === Account.APPLE_SAVINGS && tx.description === "Daily Cash Deposit" && tx.credit === Bool.TRUE,
	apply: (tx) => ({
		...tx,
		merchant: "Goldman Sachs",
		category: Category.BANKING_REWARDS,
		reviewed: Bool.TRUE
	})
}, {
	match: (tx) => tx.account === Account.APPLE_SAVINGS && tx.description === "Interest Paid" && tx.credit === Bool.TRUE,
	apply: (tx) => ({
		...tx,
		merchant: "Goldman Sachs",
		category: Category.BANKING_REWARDS,
		reviewed: Bool.TRUE
	})
}];
/**
* Apply import rules to a list of transactions. Transactions matching a rule
* are updated in-place with the rule's values. Returns the list of transactions
* that were NOT matched by any rule (i.e. still need AI processing).
*/
function applyImportRules(transactions) {
	const matched = [];
	const unmatched = [];
	for (const tx of transactions) {
		const rule = rules.find((r) => r.match(tx));
		if (rule) {
			const updated = rule.apply(tx);
			Object.assign(tx, updated);
			matched.push(tx);
		} else unmatched.push(tx);
	}
	return {
		matched,
		unmatched
	};
}
//#endregion
//#region builtin:esm-external-require-stream
var require_builtin_esm_external_require_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = m.default;
}));
/* @license
Papa Parse
v5.5.4
https://github.com/mholt/PapaParse
License: MIT
*/
//#endregion
//#region src/lib/Validate.ts
var import_papaparse = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory) {
		if (typeof define === "function" && define.amd) define([], factory);
		else if (typeof module === "object" && typeof exports !== "undefined") module.exports = factory();
		else root.Papa = factory();
	})(exports, function moduleFactory() {
		"use strict";
		var global = (function() {
			if (typeof self !== "undefined") return self;
			if (typeof window !== "undefined") return window;
			if (typeof global !== "undefined") return global;
			return {};
		})();
		function getWorkerBlob() {
			var URL = global.URL || global.webkitURL || null;
			var code = moduleFactory.toString();
			return Papa.BLOB_URL || (Papa.BLOB_URL = URL.createObjectURL(new Blob([
				"var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ",
				"(",
				code,
				")();"
			], { type: "text/javascript" })));
		}
		var IS_WORKER = !global.document && !!global.postMessage, IS_PAPA_WORKER = global.IS_PAPA_WORKER || false;
		var workers = {}, workerIdCounter = 0;
		var Papa = {};
		Papa.parse = CsvToJson;
		Papa.unparse = JsonToCsv;
		Papa.RECORD_SEP = String.fromCharCode(30);
		Papa.UNIT_SEP = String.fromCharCode(31);
		Papa.BYTE_ORDER_MARK = "﻿";
		Papa.BAD_DELIMITERS = [
			"\r",
			"\n",
			"\"",
			Papa.BYTE_ORDER_MARK
		];
		Papa.WORKERS_SUPPORTED = !IS_WORKER && !!global.Worker;
		Papa.NODE_STREAM_INPUT = 1;
		Papa.LocalChunkSize = 10485760;
		Papa.RemoteChunkSize = 5242880;
		Papa.DefaultDelimiter = ",";
		Papa.Parser = Parser;
		Papa.ParserHandle = ParserHandle;
		Papa.NetworkStreamer = NetworkStreamer;
		Papa.FileStreamer = FileStreamer;
		Papa.StringStreamer = StringStreamer;
		Papa.ReadableStreamStreamer = ReadableStreamStreamer;
		if (typeof PAPA_BROWSER_CONTEXT === "undefined") Papa.DuplexStreamStreamer = DuplexStreamStreamer;
		if (global.jQuery) {
			var $ = global.jQuery;
			$.fn.parse = function(options) {
				var config = options.config || {};
				var queue = [];
				this.each(function(idx) {
					if (!($(this).prop("tagName").toUpperCase() === "INPUT" && $(this).attr("type").toLowerCase() === "file" && global.FileReader) || !this.files || this.files.length === 0) return true;
					for (var i = 0; i < this.files.length; i++) queue.push({
						file: this.files[i],
						inputElem: this,
						instanceConfig: $.extend({}, config)
					});
				});
				parseNextFile();
				return this;
				function parseNextFile() {
					if (queue.length === 0) {
						if (isFunction(options.complete)) options.complete();
						return;
					}
					var f = queue[0];
					if (isFunction(options.before)) {
						var returned = options.before(f.file, f.inputElem);
						if (typeof returned === "object") {
							if (returned.action === "abort") {
								error("AbortError", f.file, f.inputElem, returned.reason);
								return;
							} else if (returned.action === "skip") {
								fileComplete();
								return;
							} else if (typeof returned.config === "object") f.instanceConfig = $.extend(f.instanceConfig, returned.config);
						} else if (returned === "skip") {
							fileComplete();
							return;
						}
					}
					var userCompleteFunc = f.instanceConfig.complete;
					f.instanceConfig.complete = function(results) {
						if (isFunction(userCompleteFunc)) userCompleteFunc(results, f.file, f.inputElem);
						fileComplete();
					};
					Papa.parse(f.file, f.instanceConfig);
				}
				function error(name, file, elem, reason) {
					if (isFunction(options.error)) options.error({ name }, file, elem, reason);
				}
				function fileComplete() {
					queue.splice(0, 1);
					parseNextFile();
				}
			};
		}
		if (IS_PAPA_WORKER) global.onmessage = workerThreadReceivedMessage;
		function stripBom(string) {
			if (string.charCodeAt(0) === 65279) return string.slice(1);
			return string;
		}
		function CsvToJson(_input, _config) {
			_config = _config || {};
			var dynamicTyping = _config.dynamicTyping || false;
			if (isFunction(dynamicTyping)) {
				_config.dynamicTypingFunction = dynamicTyping;
				dynamicTyping = {};
			}
			_config.dynamicTyping = dynamicTyping;
			_config.transform = isFunction(_config.transform) ? _config.transform : false;
			if (_config.worker && Papa.WORKERS_SUPPORTED) {
				var w = newWorker();
				w.userStep = _config.step;
				w.userChunk = _config.chunk;
				w.userComplete = _config.complete;
				w.userError = _config.error;
				_config.step = isFunction(_config.step);
				_config.chunk = isFunction(_config.chunk);
				_config.complete = isFunction(_config.complete);
				_config.error = isFunction(_config.error);
				delete _config.worker;
				w.postMessage({
					input: _input,
					config: _config,
					workerId: w.id
				});
				return;
			}
			var streamer = null;
			if (_input === Papa.NODE_STREAM_INPUT && typeof PAPA_BROWSER_CONTEXT === "undefined") {
				streamer = new DuplexStreamStreamer(_config);
				return streamer.getStream();
			} else if (typeof _input === "string") {
				_input = stripBom(_input);
				if (_config.download) streamer = new NetworkStreamer(_config);
				else streamer = new StringStreamer(_config);
			} else if (_input.readable === true && isFunction(_input.read) && isFunction(_input.on)) streamer = new ReadableStreamStreamer(_config);
			else if (global.File && _input instanceof File || _input instanceof Object) streamer = new FileStreamer(_config);
			return streamer.stream(_input);
		}
		function JsonToCsv(_input, _config) {
			/** whether to surround every datum with quotes */
			var _quotes = false;
			/** whether to write headers */
			var _writeHeader = true;
			/** delimiting character(s) */
			var _delimiter = ",";
			/** newline character(s) */
			var _newline = "\r\n";
			/** quote character */
			var _quoteChar = "\"";
			/** escaped quote character, either "" or <config.escapeChar>" */
			var _escapedQuote = _quoteChar + _quoteChar;
			/** whether to skip empty lines */
			var _skipEmptyLines = false;
			/** the columns (keys) we expect when we unparse objects */
			var _columns = null;
			/** whether to prevent outputting cells that can be parsed as formulae by spreadsheet software (Excel and LibreOffice) */
			var _escapeFormulae = false;
			unpackConfig();
			var quoteCharRegex = new RegExp(escapeRegExp(_quoteChar), "g");
			if (typeof _input === "string") _input = JSON.parse(_input);
			if (Array.isArray(_input)) {
				if (!_input.length || Array.isArray(_input[0])) return serialize(null, _input, _skipEmptyLines);
				else if (typeof _input[0] === "object") return serialize(_columns || Object.keys(_input[0]), _input, _skipEmptyLines);
			} else if (typeof _input === "object") {
				if (typeof _input.data === "string") _input.data = JSON.parse(_input.data);
				if (Array.isArray(_input.data)) {
					if (!_input.fields) _input.fields = _input.meta && _input.meta.fields || _columns;
					if (!_input.fields) _input.fields = Array.isArray(_input.data[0]) ? _input.fields : typeof _input.data[0] === "object" ? Object.keys(_input.data[0]) : [];
					if (!Array.isArray(_input.data[0]) && typeof _input.data[0] !== "object") _input.data = [_input.data];
				}
				return serialize(_input.fields || [], _input.data || [], _skipEmptyLines);
			}
			throw new Error("Unable to serialize unrecognized input");
			function unpackConfig() {
				if (typeof _config !== "object") return;
				if (typeof _config.delimiter === "string" && !Papa.BAD_DELIMITERS.filter(function(value) {
					return _config.delimiter.indexOf(value) !== -1;
				}).length) _delimiter = _config.delimiter;
				if (typeof _config.quotes === "boolean" || typeof _config.quotes === "function" || Array.isArray(_config.quotes)) _quotes = _config.quotes;
				if (typeof _config.skipEmptyLines === "boolean" || typeof _config.skipEmptyLines === "string") _skipEmptyLines = _config.skipEmptyLines;
				if (typeof _config.newline === "string") _newline = _config.newline;
				if (typeof _config.quoteChar === "string") {
					_quoteChar = _config.quoteChar;
					_escapedQuote = _quoteChar + _quoteChar;
				}
				if (typeof _config.header === "boolean") _writeHeader = _config.header;
				if (Array.isArray(_config.columns)) {
					if (_config.columns.length === 0) throw new Error("Option columns is empty");
					_columns = _config.columns;
				}
				if (_config.escapeChar !== void 0) _escapedQuote = _config.escapeChar + _quoteChar;
				if (_config.escapeFormulae instanceof RegExp) _escapeFormulae = _config.escapeFormulae;
				else if (typeof _config.escapeFormulae === "boolean" && _config.escapeFormulae) _escapeFormulae = /^[=+\-@\t\r].*$/;
			}
			/** The double for loop that iterates the data and writes out a CSV string including header row */
			function serialize(fields, data, skipEmptyLines) {
				var csv = "";
				if (typeof fields === "string") fields = JSON.parse(fields);
				if (typeof data === "string") data = JSON.parse(data);
				var hasHeader = Array.isArray(fields) && fields.length > 0;
				var dataKeyedByField = !Array.isArray(data[0]);
				if (hasHeader && _writeHeader) {
					for (var i = 0; i < fields.length; i++) {
						if (i > 0) csv += _delimiter;
						csv += safe(fields[i], i);
					}
					if (data.length > 0) csv += _newline;
				}
				for (var row = 0; row < data.length; row++) {
					var maxCol = hasHeader ? fields.length : data[row].length;
					var emptyLine = false;
					var nullLine = hasHeader ? Object.keys(data[row]).length === 0 : data[row].length === 0;
					if (skipEmptyLines && !hasHeader) emptyLine = skipEmptyLines === "greedy" ? data[row].join("").trim() === "" : data[row].length === 1 && data[row][0].length === 0;
					if (skipEmptyLines === "greedy" && hasHeader) {
						var line = [];
						for (var c = 0; c < maxCol; c++) {
							var cx = dataKeyedByField ? fields[c] : c;
							line.push(data[row][cx]);
						}
						emptyLine = line.join("").trim() === "";
					}
					if (!emptyLine) {
						for (var col = 0; col < maxCol; col++) {
							if (col > 0 && !nullLine) csv += _delimiter;
							var colIdx = hasHeader && dataKeyedByField ? fields[col] : col;
							csv += safe(data[row][colIdx], col);
						}
						if (row < data.length - 1 && (!skipEmptyLines || maxCol > 0 && !nullLine)) csv += _newline;
					}
				}
				return csv;
			}
			/** Encloses a value around quotes if needed (makes a value safe for CSV insertion) */
			function safe(str, col) {
				if (typeof str === "undefined" || str === null) return "";
				if (str.constructor === Date) return JSON.stringify(str).slice(1, 25);
				var needsQuotes = false;
				if (_escapeFormulae && typeof str === "string" && _escapeFormulae.test(str)) {
					str = "'" + str;
					needsQuotes = true;
				}
				var strValue = str.toString();
				var escapedQuoteStr = strValue.replace(quoteCharRegex, _escapedQuote);
				needsQuotes = needsQuotes || _quotes === true || typeof _quotes === "function" && _quotes(str, col) || Array.isArray(_quotes) && _quotes[col] || hasAny(escapedQuoteStr, Papa.BAD_DELIMITERS) || escapedQuoteStr.indexOf(_delimiter) > -1 || strValue.indexOf(_quoteChar) > -1 || escapedQuoteStr.charAt(0) === " " || escapedQuoteStr.charAt(escapedQuoteStr.length - 1) === " ";
				return needsQuotes ? _quoteChar + escapedQuoteStr + _quoteChar : escapedQuoteStr;
			}
			function hasAny(str, substrings) {
				for (var i = 0; i < substrings.length; i++) if (str.indexOf(substrings[i]) > -1) return true;
				return false;
			}
		}
		/** ChunkStreamer is the base prototype for various streamer implementations. */
		function ChunkStreamer(config) {
			this._handle = null;
			this._finished = false;
			this._completed = false;
			this._halted = false;
			this._input = null;
			this._baseIndex = 0;
			this._partialLine = "";
			this._rowCount = 0;
			this._start = 0;
			this._nextChunk = null;
			this.isFirstChunk = true;
			this._completeResults = {
				data: [],
				errors: [],
				meta: {}
			};
			replaceConfig.call(this, config);
			this.parseChunk = function(chunk, isFakeChunk) {
				const skipFirstNLines = parseInt(this._config.skipFirstNLines) || 0;
				if (this.isFirstChunk && skipFirstNLines > 0) {
					let _newline = this._config.newline;
					if (!_newline) {
						const quoteChar = this._config.quoteChar || "\"";
						_newline = this._handle.guessLineEndings(chunk, quoteChar);
					}
					chunk = [...chunk.split(_newline).slice(skipFirstNLines)].join(_newline);
				}
				if (this.isFirstChunk && isFunction(this._config.beforeFirstChunk)) {
					var modifiedChunk = this._config.beforeFirstChunk(chunk);
					if (modifiedChunk !== void 0) chunk = modifiedChunk;
				}
				this.isFirstChunk = false;
				this._halted = false;
				var aggregate = this._partialLine + chunk;
				this._partialLine = "";
				var results = this._handle.parse(aggregate, this._baseIndex, !this._finished);
				if (this._handle.paused() || this._handle.aborted()) {
					this._halted = true;
					return;
				}
				var lastIndex = results.meta.cursor;
				if (!this._finished) {
					this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
					this._baseIndex = lastIndex;
				}
				if (results && results.data) this._rowCount += results.data.length;
				var finishedIncludingPreview = this._finished || this._config.preview && this._rowCount >= this._config.preview;
				if (IS_PAPA_WORKER) global.postMessage({
					results,
					workerId: Papa.WORKER_ID,
					finished: finishedIncludingPreview
				});
				else if (isFunction(this._config.chunk) && !isFakeChunk) {
					this._config.chunk(results, this._handle);
					if (this._handle.paused() || this._handle.aborted()) {
						this._halted = true;
						return;
					}
					results = void 0;
					this._completeResults = void 0;
				}
				if (!this._config.step && !this._config.chunk) {
					this._completeResults.data = this._completeResults.data.concat(results.data);
					this._completeResults.errors = this._completeResults.errors.concat(results.errors);
					this._completeResults.meta = results.meta;
				}
				if (!this._completed && finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted)) {
					this._config.complete(this._completeResults, this._input);
					this._completed = true;
				}
				if (!finishedIncludingPreview && (!results || !results.meta.paused)) this._nextChunk();
				return results;
			};
			this._sendError = function(error) {
				if (isFunction(this._config.error)) this._config.error(error);
				else if (IS_PAPA_WORKER && this._config.error) global.postMessage({
					workerId: Papa.WORKER_ID,
					error,
					finished: false
				});
			};
			function replaceConfig(config) {
				var configCopy = copy(config);
				configCopy.chunkSize = parseInt(configCopy.chunkSize);
				if (!config.step && !config.chunk) configCopy.chunkSize = null;
				this._handle = new ParserHandle(configCopy);
				this._handle.streamer = this;
				this._config = configCopy;
			}
		}
		function NetworkStreamer(config) {
			config = config || {};
			if (!config.chunkSize) config.chunkSize = Papa.RemoteChunkSize;
			ChunkStreamer.call(this, config);
			var xhr;
			if (IS_WORKER) this._nextChunk = function() {
				this._readChunk();
				this._chunkLoaded();
			};
			else this._nextChunk = function() {
				this._readChunk();
			};
			this.stream = function(url) {
				this._input = url;
				this._nextChunk();
			};
			this._readChunk = function() {
				if (this._finished) {
					this._chunkLoaded();
					return;
				}
				xhr = new XMLHttpRequest();
				if (this._config.withCredentials) xhr.withCredentials = this._config.withCredentials;
				if (!IS_WORKER) {
					xhr.onload = bindFunction(this._chunkLoaded, this);
					xhr.onerror = bindFunction(this._chunkError, this);
				}
				xhr.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !IS_WORKER);
				if (this._config.downloadRequestHeaders) {
					var headers = this._config.downloadRequestHeaders;
					for (var headerName in headers) xhr.setRequestHeader(headerName, headers[headerName]);
				}
				if (this._config.chunkSize) {
					var end = this._start + this._config.chunkSize - 1;
					xhr.setRequestHeader("Range", "bytes=" + this._start + "-" + end);
				}
				try {
					xhr.send(this._config.downloadRequestBody);
				} catch (err) {
					this._chunkError(err.message);
				}
				if (IS_WORKER && xhr.status === 0) this._chunkError();
			};
			this._chunkLoaded = function() {
				if (xhr.readyState !== 4) return;
				if (xhr.status < 200 || xhr.status >= 400) {
					this._chunkError();
					return;
				}
				this._start += this._config.chunkSize ? this._config.chunkSize : xhr.responseText.length;
				this._finished = !this._config.chunkSize || this._start >= getFileSize(xhr);
				this.parseChunk(xhr.responseText);
			};
			this._chunkError = function(errorMessage) {
				var errorText = xhr.statusText || errorMessage;
				this._sendError(new Error(errorText));
			};
			function getFileSize(xhr) {
				var contentRange = xhr.getResponseHeader("Content-Range");
				if (contentRange === null) return -1;
				return parseInt(contentRange.substring(contentRange.lastIndexOf("/") + 1));
			}
		}
		NetworkStreamer.prototype = Object.create(ChunkStreamer.prototype);
		NetworkStreamer.prototype.constructor = NetworkStreamer;
		function FileStreamer(config) {
			config = config || {};
			if (!config.chunkSize) config.chunkSize = Papa.LocalChunkSize;
			ChunkStreamer.call(this, config);
			var reader, slice;
			var usingAsyncReader = typeof FileReader !== "undefined";
			this.stream = function(file) {
				this._input = file;
				slice = file.slice || file.webkitSlice || file.mozSlice;
				if (usingAsyncReader) {
					reader = new FileReader();
					reader.onload = bindFunction(this._chunkLoaded, this);
					reader.onerror = bindFunction(this._chunkError, this);
				} else reader = new FileReaderSync();
				this._nextChunk();
			};
			this._nextChunk = function() {
				if (!this._finished && (!this._config.preview || this._rowCount < this._config.preview)) this._readChunk();
			};
			this._readChunk = function() {
				var input = this._input;
				if (this._config.chunkSize) {
					var end = Math.min(this._start + this._config.chunkSize, this._input.size);
					input = slice.call(input, this._start, end);
				}
				var txt = reader.readAsText(input, this._config.encoding);
				if (!usingAsyncReader) this._chunkLoaded({ target: { result: txt } });
			};
			this._chunkLoaded = function(event) {
				this._start += this._config.chunkSize;
				this._finished = !this._config.chunkSize || this._start >= this._input.size;
				this.parseChunk(event.target.result);
			};
			this._chunkError = function() {
				this._sendError(reader.error);
			};
		}
		FileStreamer.prototype = Object.create(ChunkStreamer.prototype);
		FileStreamer.prototype.constructor = FileStreamer;
		function StringStreamer(config) {
			config = config || {};
			ChunkStreamer.call(this, config);
			var remaining;
			this.stream = function(s) {
				remaining = s;
				return this._nextChunk();
			};
			this._nextChunk = function() {
				if (this._finished) return;
				var size = this._config.chunkSize;
				var chunk;
				if (size) {
					chunk = remaining.substring(0, size);
					remaining = remaining.substring(size);
				} else {
					chunk = remaining;
					remaining = "";
				}
				this._finished = !remaining;
				return this.parseChunk(chunk);
			};
		}
		StringStreamer.prototype = Object.create(StringStreamer.prototype);
		StringStreamer.prototype.constructor = StringStreamer;
		function ReadableStreamStreamer(config) {
			config = config || {};
			ChunkStreamer.call(this, config);
			var queue = [];
			var parseOnData = true;
			var streamHasEnded = false;
			this.pause = function() {
				ChunkStreamer.prototype.pause.apply(this, arguments);
				this._input.pause();
			};
			this.resume = function() {
				ChunkStreamer.prototype.resume.apply(this, arguments);
				this._input.resume();
			};
			this.stream = function(stream) {
				this._input = stream;
				this._input.on("data", this._streamData);
				this._input.on("end", this._streamEnd);
				this._input.on("error", this._streamError);
			};
			this._checkIsFinished = function() {
				if (streamHasEnded && queue.length === 1) this._finished = true;
			};
			this._nextChunk = function() {
				this._checkIsFinished();
				if (queue.length) this.parseChunk(queue.shift());
				else parseOnData = true;
			};
			this._streamData = bindFunction(function(chunk) {
				try {
					queue.push(typeof chunk === "string" ? chunk : chunk.toString(this._config.encoding));
					if (parseOnData) {
						parseOnData = false;
						this._checkIsFinished();
						this.parseChunk(queue.shift());
					}
				} catch (error) {
					this._streamError(error);
				}
			}, this);
			this._streamError = bindFunction(function(error) {
				this._streamCleanUp();
				this._sendError(error);
			}, this);
			this._streamEnd = bindFunction(function() {
				this._streamCleanUp();
				streamHasEnded = true;
				this._streamData("");
			}, this);
			this._streamCleanUp = bindFunction(function() {
				this._input.removeListener("data", this._streamData);
				this._input.removeListener("end", this._streamEnd);
				this._input.removeListener("error", this._streamError);
			}, this);
		}
		ReadableStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
		ReadableStreamStreamer.prototype.constructor = ReadableStreamStreamer;
		function DuplexStreamStreamer(_config) {
			var Duplex = require_builtin_esm_external_require_stream().Duplex;
			var config = copy(_config);
			var parseOnWrite = true;
			var writeStreamHasFinished = false;
			var parseCallbackQueue = [];
			var stream = null;
			this._onCsvData = function(results) {
				var data = results.data;
				if (!stream.push(data) && !this._handle.paused()) this._handle.pause();
			};
			this._onCsvComplete = function() {
				stream.push(null);
			};
			config.step = bindFunction(this._onCsvData, this);
			config.complete = bindFunction(this._onCsvComplete, this);
			ChunkStreamer.call(this, config);
			this._nextChunk = function() {
				if (writeStreamHasFinished && parseCallbackQueue.length === 1) this._finished = true;
				if (parseCallbackQueue.length) parseCallbackQueue.shift()();
				else parseOnWrite = true;
			};
			this._addToParseQueue = function(chunk, callback) {
				parseCallbackQueue.push(bindFunction(function() {
					this.parseChunk(typeof chunk === "string" ? chunk : chunk.toString(config.encoding));
					if (isFunction(callback)) return callback();
				}, this));
				if (parseOnWrite) {
					parseOnWrite = false;
					this._nextChunk();
				}
			};
			this._onRead = function() {
				if (this._handle.paused()) this._handle.resume();
			};
			this._onWrite = function(chunk, encoding, callback) {
				this._addToParseQueue(chunk, callback);
			};
			this._onWriteComplete = function() {
				writeStreamHasFinished = true;
				this._addToParseQueue("");
			};
			this.getStream = function() {
				return stream;
			};
			stream = new Duplex({
				readableObjectMode: true,
				decodeStrings: false,
				read: bindFunction(this._onRead, this),
				write: bindFunction(this._onWrite, this)
			});
			stream.once("finish", bindFunction(this._onWriteComplete, this));
		}
		if (typeof PAPA_BROWSER_CONTEXT === "undefined") {
			DuplexStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
			DuplexStreamStreamer.prototype.constructor = DuplexStreamStreamer;
		}
		function ParserHandle(_config) {
			var MAX_FLOAT = Math.pow(2, 53);
			var MIN_FLOAT = -MAX_FLOAT;
			var FLOAT = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/;
			var ISO_DATE = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/;
			var self = this;
			var _stepCounter = 0;
			var _rowCounter = 0;
			var _input;
			var _parser;
			var _paused = false;
			var _aborted = false;
			var _delimiterError;
			var _fields = [];
			var _results = {
				data: [],
				errors: [],
				meta: {}
			};
			if (isFunction(_config.step)) {
				var userStep = _config.step;
				_config.step = function(results) {
					_results = results;
					if (needsHeaderRow()) processResults();
					else {
						processResults();
						if (_results.data.length === 0) return;
						_stepCounter += results.data.length;
						if (_config.preview && _stepCounter > _config.preview) _parser.abort();
						else {
							_results.data = _results.data[0];
							userStep(_results, self);
						}
					}
				};
			}
			/**
			* Parses input. Most users won't need, and shouldn't mess with, the baseIndex
			* and ignoreLastRow parameters. They are used by streamers (wrapper functions)
			* when an input comes in multiple chunks, like from a file.
			*/
			this.parse = function(input, baseIndex, ignoreLastRow) {
				var quoteChar = _config.quoteChar || "\"";
				if (!_config.newline) _config.newline = this.guessLineEndings(input, quoteChar);
				_delimiterError = false;
				if (!_config.delimiter) {
					var delimGuess = guessDelimiter(input, _config.newline, _config.skipEmptyLines, _config.comments, _config.delimitersToGuess);
					if (delimGuess.successful) _config.delimiter = delimGuess.bestDelimiter;
					else {
						_delimiterError = true;
						_config.delimiter = Papa.DefaultDelimiter;
					}
					_results.meta.delimiter = _config.delimiter;
				} else if (isFunction(_config.delimiter)) {
					_config.delimiter = _config.delimiter(input);
					_results.meta.delimiter = _config.delimiter;
				}
				var parserConfig = copy(_config);
				if (_config.preview && _config.header) parserConfig.preview++;
				_input = input;
				_parser = new Parser(parserConfig);
				_results = _parser.parse(_input, baseIndex, ignoreLastRow);
				processResults();
				return _paused ? { meta: { paused: true } } : _results || { meta: { paused: false } };
			};
			this.paused = function() {
				return _paused;
			};
			this.pause = function() {
				_paused = true;
				_parser.abort();
				_input = isFunction(_config.chunk) ? "" : _input.substring(_parser.getCharIndex());
			};
			this.resume = function() {
				if (self.streamer._halted) {
					_paused = false;
					self.streamer.parseChunk(_input, true);
				} else setTimeout(self.resume, 3);
			};
			this.aborted = function() {
				return _aborted;
			};
			this.abort = function() {
				_aborted = true;
				_parser.abort();
				_results.meta.aborted = true;
				if (isFunction(_config.complete)) _config.complete(_results);
				_input = "";
			};
			this.guessLineEndings = function(input, quoteChar) {
				input = input.substring(0, 1048576);
				var re = new RegExp(escapeRegExp(quoteChar) + "([^]*?)" + escapeRegExp(quoteChar), "gm");
				input = input.replace(re, "");
				var r = input.split("\r");
				var n = input.split("\n");
				var nAppearsFirst = n.length > 1 && n[0].length < r[0].length;
				if (r.length === 1 || nAppearsFirst) return "\n";
				var numWithN = 0;
				for (var i = 0; i < r.length; i++) if (r[i][0] === "\n") numWithN++;
				return numWithN >= r.length / 2 ? "\r\n" : "\r";
			};
			function testEmptyLine(s) {
				return _config.skipEmptyLines === "greedy" ? s.join("").trim() === "" : s.length === 1 && s[0].length === 0;
			}
			function testFloat(s) {
				if (FLOAT.test(s)) {
					var floatValue = parseFloat(s);
					if (floatValue > MIN_FLOAT && floatValue < MAX_FLOAT) return true;
				}
				return false;
			}
			function processResults() {
				if (_results && _delimiterError) {
					addError("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + Papa.DefaultDelimiter + "'");
					_delimiterError = false;
				}
				if (_config.skipEmptyLines) _results.data = _results.data.filter(function(d) {
					return !testEmptyLine(d);
				});
				if (needsHeaderRow()) fillHeaderFields();
				return applyHeaderAndDynamicTypingAndTransformation();
			}
			function needsHeaderRow() {
				return _config.header && _fields.length === 0;
			}
			function fillHeaderFields() {
				if (!_results) return;
				function addHeader(header, i) {
					header = stripBom(header);
					if (isFunction(_config.transformHeader)) header = _config.transformHeader(header, i);
					_fields.push(header);
				}
				if (Array.isArray(_results.data[0])) {
					for (var i = 0; needsHeaderRow() && i < _results.data.length; i++) _results.data[i].forEach(addHeader);
					_results.data.splice(0, 1);
				} else _results.data.forEach(addHeader);
			}
			function shouldApplyDynamicTyping(field) {
				if (_config.dynamicTypingFunction && _config.dynamicTyping[field] === void 0) _config.dynamicTyping[field] = _config.dynamicTypingFunction(field);
				return (_config.dynamicTyping[field] || _config.dynamicTyping) === true;
			}
			function parseDynamic(field, value) {
				if (shouldApplyDynamicTyping(field)) if (value === "true" || value === "TRUE") return true;
				else if (value === "false" || value === "FALSE") return false;
				else if (testFloat(value)) return parseFloat(value);
				else if (ISO_DATE.test(value)) return new Date(value);
				else return value === "" ? null : value;
				return value;
			}
			function applyHeaderAndDynamicTypingAndTransformation() {
				if (!_results || !_config.header && !_config.dynamicTyping && !_config.transform) return _results;
				function processRow(rowSource, i) {
					var row = _config.header ? {} : [];
					var j;
					for (j = 0; j < rowSource.length; j++) {
						var field = j;
						var value = rowSource[j];
						if (_config.header) field = j >= _fields.length ? "__parsed_extra" : _fields[j];
						if (_config.transform) value = _config.transform(value, field);
						value = parseDynamic(field, value);
						if (field === "__parsed_extra") {
							row[field] = row[field] || [];
							row[field].push(value);
						} else row[field] = value;
					}
					if (_config.header) {
						if (j > _fields.length) addError("FieldMismatch", "TooManyFields", "Too many fields: expected " + _fields.length + " fields but parsed " + j, _rowCounter + i);
						else if (j < _fields.length) addError("FieldMismatch", "TooFewFields", "Too few fields: expected " + _fields.length + " fields but parsed " + j, _rowCounter + i);
					}
					return row;
				}
				var incrementBy = 1;
				if (!_results.data.length || Array.isArray(_results.data[0])) {
					_results.data = _results.data.map(processRow);
					incrementBy = _results.data.length;
				} else _results.data = processRow(_results.data, 0);
				if (_config.header && _results.meta) _results.meta.fields = _fields;
				_rowCounter += incrementBy;
				return _results;
			}
			function guessDelimiter(input, newline, skipEmptyLines, comments, delimitersToGuess) {
				var bestDelim, bestDelta, fieldCountPrevRow, maxFieldCount;
				delimitersToGuess = delimitersToGuess || [
					",",
					"	",
					"|",
					";",
					Papa.RECORD_SEP,
					Papa.UNIT_SEP
				];
				for (var i = 0; i < delimitersToGuess.length; i++) {
					var delim = delimitersToGuess[i];
					var delta = 0, avgFieldCount = 0, emptyLinesCount = 0;
					fieldCountPrevRow = void 0;
					var preview = new Parser({
						comments,
						delimiter: delim,
						newline,
						preview: 10
					}).parse(input);
					for (var j = 0; j < preview.data.length; j++) {
						if (skipEmptyLines && testEmptyLine(preview.data[j])) {
							emptyLinesCount++;
							continue;
						}
						var fieldCount = preview.data[j].length;
						avgFieldCount += fieldCount;
						if (typeof fieldCountPrevRow === "undefined") {
							fieldCountPrevRow = fieldCount;
							continue;
						} else if (fieldCount > 0) {
							delta += Math.abs(fieldCount - fieldCountPrevRow);
							fieldCountPrevRow = fieldCount;
						}
					}
					if (preview.data.length > 0) avgFieldCount /= preview.data.length - emptyLinesCount;
					if ((typeof bestDelta === "undefined" || delta <= bestDelta) && (typeof maxFieldCount === "undefined" || avgFieldCount > maxFieldCount) && avgFieldCount > 1.99) {
						bestDelta = delta;
						bestDelim = delim;
						maxFieldCount = avgFieldCount;
					}
				}
				_config.delimiter = bestDelim;
				return {
					successful: !!bestDelim,
					bestDelimiter: bestDelim
				};
			}
			function addError(type, code, msg, row) {
				var error = {
					type,
					code,
					message: msg
				};
				if (row !== void 0) error.row = row;
				_results.errors.push(error);
			}
		}
		/** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions */
		function escapeRegExp(string) {
			return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}
		/** The core parser implements speedy and correct CSV parsing */
		function Parser(config) {
			config = config || {};
			var delim = config.delimiter;
			var newline = config.newline;
			var comments = config.comments;
			var step = config.step;
			var preview = config.preview;
			var fastMode = config.fastMode;
			var quoteChar;
			var renamedHeaders = null;
			var headerParsed = false;
			if (config.quoteChar === void 0 || config.quoteChar === null) quoteChar = "\"";
			else quoteChar = config.quoteChar;
			var escapeChar = quoteChar;
			if (config.escapeChar !== void 0) escapeChar = config.escapeChar;
			if (typeof delim !== "string" || Papa.BAD_DELIMITERS.indexOf(delim) > -1) delim = ",";
			if (comments === delim) throw new Error("Comment character same as delimiter");
			else if (comments === true) comments = "#";
			else if (typeof comments !== "string" || Papa.BAD_DELIMITERS.indexOf(comments) > -1) comments = false;
			if (newline !== "\n" && newline !== "\r" && newline !== "\r\n") newline = "\n";
			var cursor = 0;
			var aborted = false;
			this.parse = function(input, baseIndex, ignoreLastRow) {
				if (typeof input !== "string") throw new Error("Input must be a string");
				var inputLen = input.length, delimLen = delim.length, newlineLen = newline.length, commentsLen = comments.length;
				var stepIsFunction = isFunction(step);
				cursor = 0;
				var data = [], errors = [], row = [], lastCursor = 0;
				if (!input) return returnable();
				if (fastMode || fastMode !== false && input.indexOf(quoteChar) === -1) {
					var rows = input.split(newline);
					for (var i = 0; i < rows.length; i++) {
						row = rows[i];
						cursor += row.length;
						if (i !== rows.length - 1) cursor += newline.length;
						else if (ignoreLastRow) return returnable();
						if (comments && row.substring(0, commentsLen) === comments) continue;
						if (stepIsFunction) {
							data = [];
							pushRow(row.split(delim));
							doStep();
							if (aborted) return returnable();
						} else pushRow(row.split(delim));
						if (preview && i >= preview) {
							data = data.slice(0, preview);
							return returnable(true);
						}
					}
					return returnable();
				}
				var nextDelim = input.indexOf(delim, cursor);
				var nextNewline = input.indexOf(newline, cursor);
				var quoteCharRegex = new RegExp(escapeRegExp(escapeChar) + escapeRegExp(quoteChar), "g");
				var quoteSearch = input.indexOf(quoteChar, cursor);
				for (;;) {
					if (input[cursor] === quoteChar) {
						quoteSearch = cursor;
						cursor++;
						for (;;) {
							quoteSearch = input.indexOf(quoteChar, quoteSearch + 1);
							if (quoteSearch === -1) {
								if (!ignoreLastRow) errors.push({
									type: "Quotes",
									code: "MissingQuotes",
									message: "Quoted field unterminated",
									row: data.length,
									index: cursor
								});
								return finish();
							}
							if (quoteSearch === inputLen - 1) return finish(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
							if (quoteChar === escapeChar && input[quoteSearch + 1] === escapeChar) {
								quoteSearch++;
								continue;
							}
							if (quoteChar !== escapeChar && quoteSearch !== 0 && input[quoteSearch - 1] === escapeChar) continue;
							if (nextDelim !== -1 && nextDelim < quoteSearch + 1) nextDelim = input.indexOf(delim, quoteSearch + 1);
							if (nextNewline !== -1 && nextNewline < quoteSearch + 1) nextNewline = input.indexOf(newline, quoteSearch + 1);
							var spacesBetweenQuoteAndDelimiter = extraSpaces(nextNewline === -1 ? nextDelim : Math.min(nextDelim, nextNewline));
							if (input.substr(quoteSearch + 1 + spacesBetweenQuoteAndDelimiter, delimLen) === delim) {
								row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
								cursor = quoteSearch + 1 + spacesBetweenQuoteAndDelimiter + delimLen;
								if (input[quoteSearch + 1 + spacesBetweenQuoteAndDelimiter + delimLen] !== quoteChar) quoteSearch = input.indexOf(quoteChar, cursor);
								nextDelim = input.indexOf(delim, cursor);
								nextNewline = input.indexOf(newline, cursor);
								break;
							}
							var spacesBetweenQuoteAndNewLine = extraSpaces(nextNewline);
							if (input.substring(quoteSearch + 1 + spacesBetweenQuoteAndNewLine, quoteSearch + 1 + spacesBetweenQuoteAndNewLine + newlineLen) === newline) {
								row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
								saveRow(quoteSearch + 1 + spacesBetweenQuoteAndNewLine + newlineLen);
								nextDelim = input.indexOf(delim, cursor);
								quoteSearch = input.indexOf(quoteChar, cursor);
								if (stepIsFunction) {
									doStep();
									if (aborted) return returnable();
								}
								if (preview && data.length >= preview) return returnable(true);
								break;
							}
							errors.push({
								type: "Quotes",
								code: "InvalidQuotes",
								message: "Trailing quote on quoted field is malformed",
								row: data.length,
								index: cursor
							});
							quoteSearch++;
						}
						continue;
					}
					if (comments && row.length === 0 && input.substring(cursor, cursor + commentsLen) === comments) {
						if (nextNewline === -1) return returnable();
						cursor = nextNewline + newlineLen;
						nextNewline = input.indexOf(newline, cursor);
						nextDelim = input.indexOf(delim, cursor);
						continue;
					}
					if (nextDelim !== -1 && (nextDelim < nextNewline || nextNewline === -1)) {
						row.push(input.substring(cursor, nextDelim));
						cursor = nextDelim + delimLen;
						nextDelim = input.indexOf(delim, cursor);
						continue;
					}
					if (nextNewline !== -1) {
						row.push(input.substring(cursor, nextNewline));
						saveRow(nextNewline + newlineLen);
						if (stepIsFunction) {
							doStep();
							if (aborted) return returnable();
						}
						if (preview && data.length >= preview) return returnable(true);
						continue;
					}
					break;
				}
				return finish();
				function pushRow(row) {
					data.push(row);
					lastCursor = cursor;
				}
				/**
				* checks if there are extra spaces after closing quote and given index without any text
				* if Yes, returns the number of spaces
				*/
				function extraSpaces(index) {
					var spaceLength = 0;
					if (index !== -1) {
						var textBetweenClosingQuoteAndIndex = input.substring(quoteSearch + 1, index);
						if (textBetweenClosingQuoteAndIndex && textBetweenClosingQuoteAndIndex.trim() === "") spaceLength = textBetweenClosingQuoteAndIndex.length;
					}
					return spaceLength;
				}
				/**
				* Appends the remaining input from cursor to the end into
				* row, saves the row, calls step, and returns the results.
				*/
				function finish(value) {
					if (ignoreLastRow) return returnable();
					if (typeof value === "undefined") value = input.substring(cursor);
					row.push(value);
					cursor = inputLen;
					pushRow(row);
					if (stepIsFunction) doStep();
					return returnable();
				}
				/**
				* Appends the current row to the results. It sets the cursor
				* to newCursor and finds the nextNewline. The caller should
				* take care to execute user's step function and check for
				* preview and end parsing if necessary.
				*/
				function saveRow(newCursor) {
					cursor = newCursor;
					pushRow(row);
					row = [];
					nextNewline = input.indexOf(newline, cursor);
				}
				/** Returns an object with the results, errors, and meta. */
				function returnable(stopped) {
					if (config.header && !baseIndex && data.length && !headerParsed) {
						const result = data[0];
						const headerCount = Object.create(null);
						const usedHeaders = new Set(result);
						let duplicateHeaders = false;
						for (let i = 0; i < result.length; i++) {
							let header = stripBom(result[i]);
							if (isFunction(config.transformHeader)) header = config.transformHeader(header, i);
							if (!headerCount[header]) {
								headerCount[header] = 1;
								result[i] = header;
							} else {
								let newHeader;
								let suffixCount = headerCount[header];
								do {
									newHeader = `${header}_${suffixCount}`;
									suffixCount++;
								} while (usedHeaders.has(newHeader));
								usedHeaders.add(newHeader);
								result[i] = newHeader;
								headerCount[header]++;
								duplicateHeaders = true;
								if (renamedHeaders === null) renamedHeaders = {};
								renamedHeaders[newHeader] = header;
							}
							usedHeaders.add(header);
						}
						if (duplicateHeaders) console.warn("Duplicate headers found and renamed.");
						headerParsed = true;
					}
					return {
						data,
						errors,
						meta: {
							delimiter: delim,
							linebreak: newline,
							aborted,
							truncated: !!stopped,
							cursor: lastCursor + (baseIndex || 0),
							renamedHeaders
						}
					};
				}
				/** Executes the user's step function and resets data & errors. */
				function doStep() {
					step(returnable());
					data = [];
					errors = [];
				}
			};
			/** Sets the abort flag */
			this.abort = function() {
				aborted = true;
			};
			/** Gets the cursor position */
			this.getCharIndex = function() {
				return cursor;
			};
		}
		function newWorker() {
			if (!Papa.WORKERS_SUPPORTED) return false;
			var workerUrl = getWorkerBlob();
			var w = new global.Worker(workerUrl);
			w.onmessage = mainThreadReceivedMessage;
			w.id = workerIdCounter++;
			workers[w.id] = w;
			return w;
		}
		/** Callback when main thread receives a message */
		function mainThreadReceivedMessage(e) {
			var msg = e.data;
			var worker = workers[msg.workerId];
			var aborted = false;
			if (msg.error) worker.userError(msg.error, msg.file);
			else if (msg.results && msg.results.data) {
				var abort = function() {
					aborted = true;
					completeWorker(msg.workerId, {
						data: [],
						errors: [],
						meta: { aborted: true }
					});
				};
				var handle = {
					abort,
					pause: notImplemented,
					resume: notImplemented
				};
				if (isFunction(worker.userStep)) {
					for (var i = 0; i < msg.results.data.length; i++) {
						worker.userStep({
							data: msg.results.data[i],
							errors: msg.results.errors,
							meta: msg.results.meta
						}, handle);
						if (aborted) break;
					}
					delete msg.results;
				} else if (isFunction(worker.userChunk)) {
					worker.userChunk(msg.results, handle, msg.file);
					delete msg.results;
				}
			}
			if (msg.finished && !aborted) completeWorker(msg.workerId, msg.results);
		}
		function completeWorker(workerId, results) {
			var worker = workers[workerId];
			if (isFunction(worker.userComplete)) worker.userComplete(results);
			worker.terminate();
			delete workers[workerId];
		}
		function notImplemented() {
			throw new Error("Not implemented.");
		}
		/** Callback when worker thread receives a message */
		function workerThreadReceivedMessage(e) {
			var msg = e.data;
			if (typeof Papa.WORKER_ID === "undefined" && msg) Papa.WORKER_ID = msg.workerId;
			if (typeof msg.input === "string") global.postMessage({
				workerId: Papa.WORKER_ID,
				results: Papa.parse(msg.input, msg.config),
				finished: true
			});
			else if (global.File && msg.input instanceof File || msg.input instanceof Object) {
				var results = Papa.parse(msg.input, msg.config);
				if (results) global.postMessage({
					workerId: Papa.WORKER_ID,
					results,
					finished: true
				});
			}
		}
		/** Makes a deep copy of an array or object (mostly) */
		function copy(obj) {
			if (typeof obj !== "object" || obj === null) return obj;
			var cpy = Array.isArray(obj) ? [] : {};
			for (var key in obj) cpy[key] = copy(obj[key]);
			return cpy;
		}
		function bindFunction(f, self) {
			return function() {
				f.apply(self, arguments);
			};
		}
		function isFunction(func) {
			return typeof func === "function";
		}
		return Papa;
	});
})))();
function validRule(rule) {
	return rule.merchant !== null && validStr(rule.merchant) && rule.merchant !== "" && rule.category !== null && validStr(rule.category) && rule.category !== "" && Object.values(Category).includes(rule.category);
}
function validTransaction(transaction) {
	return validStr(transaction.key) && transaction.key !== "" && validDay(transaction.day) && validMonth(transaction.month) && validYear(transaction.year) && validNum(transaction.amount) && validBool(transaction.credit) && validNullableStr(transaction.merchant) && validAccount(transaction.account) && validStr(transaction.description) && validNullableStr(transaction.notes) && validTags(transaction.tags) && validBool(transaction.skipped) && validBool(transaction.reviewed);
}
function valid1CreditRecord(record) {
	const cardNoRegex = /^\d{4}$/;
	const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
	return validStr(record["Transaction Date"]) && dateRegex.test(record["Transaction Date"]) && validStr(record["Posted Date"]) && dateRegex.test(record["Posted Date"]) && validStr(record["Card No."]) && cardNoRegex.test(record["Card No."]) && validStr(record.Description) && record.Description !== "" && validStr(record.Category) && record.Category !== "" && (validNumStr(record.Credit) || validNumStr(record.Debit)) && (record.Credit !== "" || record.Debit !== "") && (validNumStr(record.Credit) || validNumStr(record.Debit));
}
function validC1CheckingRecord(record) {
	return validStr(record["Account Number"]) && /^\d{4}$/.test(record["Account Number"]) && validStr(record["Transaction Date"]) && /^\d{2}\/\d{2}\/\d{2}$/.test(record["Transaction Date"]) && validStr(record["Transaction Amount"]) && record["Transaction Amount"] !== "" && validStr(record["Transaction Type"]) && (record["Transaction Type"] === "Debit" || record["Transaction Type"] === "Credit") && validStr(record["Transaction Description"]) && record["Transaction Description"] !== "" && validStr(record.Balance);
}
function validAppleCardCreditRecord(record) {
	const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
	return validStr(record["Transaction Date"]) && dateRegex.test(record["Transaction Date"]) && validStr(record["Clearing Date"]) && dateRegex.test(record["Clearing Date"]) && validStr(record.Description) && record.Description !== "" && validStr(record.Merchant) && record.Merchant !== "" && validStr(record.Category) && record.Category !== "" && validStr(record.Type) && record.Type !== "" && validNumStr(record["Amount (USD)"]) && record["Amount (USD)"] !== "" && validStr(record["Purchased By"]) && record["Purchased By"] !== "";
}
function validAppleCardSavingsRecord(record) {
	const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
	return validStr(record["Transaction Date"]) && dateRegex.test(record["Transaction Date"]) && validStr(record["Posted Date"]) && dateRegex.test(record["Posted Date"]) && validStr(record["Activity Type"]) && record["Activity Type"] !== "" && validStr(record["Transaction Type"]) && record["Transaction Type"] !== "" && validStr(record.Description) && record.Description !== "" && validStr(record["Currency Code"]) && record["Currency Code"] !== "" && validNumStr(record.Amount) && record.Amount !== "";
}
function validStr(field) {
	return field !== void 0 && field !== null && typeof field === "string";
}
function validNullableStr(field) {
	return field === null || validStr(field);
}
function validNum(field) {
	return field !== void 0 && field !== null && typeof field === "number" && !isNaN(field);
}
function validNumStr(field) {
	return validStr(field) && !isNaN(Number(field));
}
function validBool(field) {
	return validNum(field) && (field === Bool.TRUE || field === Bool.FALSE);
}
function validDay(day) {
	return validNum(day) && Number.isInteger(day) && day >= 1 && day <= 31;
}
function validMonth(month) {
	return validNum(month) && Number.isInteger(month) && month >= 1 && month <= 12;
}
function validYear(year) {
	const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
	return validNum(year) && Number.isInteger(year) && year >= 2026 && year <= currentYear;
}
function validAccount(account) {
	return Object.values(Account).includes(account);
}
function validTags(tags) {
	if (tags === void 0 || tags === null) return true;
	if (!Array.isArray(tags)) return false;
	return tags.every((tag) => validTag(tag));
}
function validTag(tag) {
	return Object.values(Tag).includes(tag);
}
//#endregion
//#region src/lib/Process.ts
/**
* Generate a unique identifier for a raw transaction by:
* 1. Sorting the keys of the raw transaction
* 2. Concatenating the values of the sorted keys
* 3. Removing all whitespace
*/
function generateRecordId(record) {
	let id = "";
	const keys = Object.keys(record);
	keys.sort();
	for (const key of keys) id += record[key];
	id = id.replace(/\s/g, "");
	return id;
}
/**
* Process is the main ingestion point for CSV imports.
* It validates the contents of the CSV, and converts it to a standardized list of transactions.
*/
function process(csv, account) {
	let transactions = [];
	let invalidCount = 0;
	csv = csv.trim();
	if ([Account.CAPITAL_ONE_SAVOR, Account.CAPITAL_ONE_QUICKSILVER].includes(account)) {
		const result = (0, import_papaparse.parse)(csv, { header: true });
		const valid = result.data.filter(valid1CreditRecord);
		invalidCount = result.data.length - valid.length;
		transactions = c1CreditRecordsToTransactions(valid, account);
	}
	if (account === Account.CAPITAL_ONE_CHECKING) {
		const result = (0, import_papaparse.parse)(csv, { header: true });
		const valid = result.data.filter(validC1CheckingRecord);
		invalidCount = result.data.length - valid.length;
		transactions = c1CheckingRecordsToTransactions(valid, account);
	}
	if (account === Account.APPLE_CARD) {
		const result = (0, import_papaparse.parse)(csv, { header: true });
		const valid = result.data.filter(validAppleCardCreditRecord);
		invalidCount = result.data.length - valid.length;
		transactions = appleCardCreditRecordsToTransactions(valid, account);
	}
	if (account === Account.APPLE_SAVINGS) {
		const result = (0, import_papaparse.parse)(csv, { header: true });
		const valid = result.data.filter(validAppleCardSavingsRecord);
		invalidCount = result.data.length - valid.length;
		transactions = appleCardSavingsRecordsToTransactions(valid, account);
	}
	const result = normalizeTransactions(transactions);
	transactions = result.transactions;
	return {
		transactions,
		invalidCount,
		mergedCount: result.mergedCount
	};
}
/**
* Convert a record from a C1 credit account to a standard transaction.
*/
function c1CreditRecordToTransaction(record, account) {
	const amount = record.Debit !== "" ? Number(record.Debit) : Number(record.Credit);
	const credit = record.Debit !== "" ? Bool.FALSE : Bool.TRUE;
	return {
		key: generateRecordId(record),
		day: Number(record["Transaction Date"].split("-")[2]),
		month: Number(record["Transaction Date"].split("-")[1]),
		year: Number(record["Transaction Date"].split("-")[0]),
		description: record.Description,
		merchant: null,
		category: null,
		amount,
		credit,
		account,
		notes: null,
		skipped: Bool.FALSE,
		reviewed: Bool.FALSE
	};
}
function c1CreditRecordsToTransactions(records, account) {
	return records.map((record) => c1CreditRecordToTransaction(record, account));
}
/**
* Convert a record from a C1 checking account to a standard transaction.
*/
function c1CheckingRecordToTransaction(record, account) {
	const credit = record["Transaction Type"] === "Credit" ? Bool.TRUE : Bool.FALSE;
	const amount = Number(record["Transaction Amount"]);
	return {
		key: generateRecordId(record),
		day: Number(record["Transaction Date"].split("/")[1]),
		month: Number(record["Transaction Date"].split("/")[0]),
		year: Number(`20${record["Transaction Date"].split("/")[2]}`),
		description: record["Transaction Description"],
		merchant: null,
		category: null,
		amount,
		credit,
		account,
		notes: null,
		skipped: Bool.FALSE,
		reviewed: Bool.FALSE
	};
}
function c1CheckingRecordsToTransactions(records, account) {
	return records.map((record) => c1CheckingRecordToTransaction(record, account));
}
/**
* Convert a record from an Apple Card credit account to a standard transaction.
*/
function appleCardCreditRecordToTransaction(record, account) {
	const credit = record["Amount (USD)"].startsWith("-") === true ? Bool.TRUE : Bool.FALSE;
	const amount = credit === Bool.TRUE ? Number(record["Amount (USD)"].substring(1)) : Number(record["Amount (USD)"]);
	return {
		key: generateRecordId(record),
		day: Number(record["Transaction Date"].split("/")[1]),
		month: Number(record["Transaction Date"].split("/")[0]),
		year: Number(record["Transaction Date"].split("/")[2]),
		description: record.Description,
		merchant: null,
		category: null,
		amount,
		credit,
		account,
		notes: null,
		skipped: Bool.FALSE,
		reviewed: Bool.FALSE
	};
}
function appleCardCreditRecordsToTransactions(records, account) {
	return records.map((record) => appleCardCreditRecordToTransaction(record, account));
}
/**
* Convert a record from an Apple Card savings account to a standard transaction.
*/
function appleCardSavingsRecordToTransaction(record, account) {
	const credit = record["Transaction Type"] === "Credit" ? Bool.TRUE : Bool.FALSE;
	return {
		key: generateRecordId(record),
		day: Number(record["Transaction Date"].split("/")[1]),
		month: Number(record["Transaction Date"].split("/")[0]),
		year: Number(record["Transaction Date"].split("/")[2]),
		amount: Number(record.Amount),
		credit,
		merchant: null,
		category: null,
		account,
		description: record.Description,
		notes: null,
		skipped: Bool.FALSE,
		reviewed: Bool.FALSE
	};
}
function appleCardSavingsRecordsToTransactions(records, account) {
	return records.map((record) => appleCardSavingsRecordToTransaction(record, account));
}
function normalizeTransactions(transactions) {
	let result = transactions.slice();
	const keys = transactions.map((transaction) => transaction.key);
	const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);
	for (const duplicate of duplicates) {
		const duplicateTransactions = transactions.filter((transaction) => transaction.key === duplicate);
		const amount = duplicateTransactions.reduce((sum, transaction) => sum + Number(transaction.amount), 0);
		result = result.filter((transaction) => transaction.key !== duplicate);
		result.push({
			...duplicateTransactions[0],
			amount,
			notes: "Merged duplicate transactions"
		});
	}
	return {
		transactions: result,
		mergedCount: duplicates.length
	};
}
//#endregion
//#region src/data/db.ts?tss-serverfn-split
function rowToTransaction(row) {
	return {
		id: row.id,
		key: row.key,
		day: row.day,
		month: row.month,
		year: row.year,
		amount: row.amount,
		credit: row.credit,
		merchant: row.merchant,
		category: row.category,
		account: row.account,
		description: row.description,
		notes: row.notes,
		tags: row.tags ? JSON.parse(row.tags) : null,
		skipped: row.skipped,
		reviewed: row.reviewed
	};
}
function rowToRule(row) {
	return {
		id: row.id,
		merchant: row.merchant,
		category: row.category
	};
}
var INSERT_TRANSACTION_SQL = `INSERT INTO transactions (key, day, month, year, amount, credit, merchant, category, account, description, notes, tags, skipped, reviewed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
function bindTransaction(tx) {
	return [
		tx.key,
		tx.day,
		tx.month,
		tx.year,
		tx.amount,
		tx.credit,
		tx.merchant,
		tx.category,
		tx.account,
		tx.description,
		tx.notes,
		tx.tags ? JSON.stringify(tx.tags) : null,
		tx.skipped,
		tx.reviewed
	];
}
function errorMessage(error) {
	return error instanceof Error ? error.message : "Unknown error";
}
var getMerchants_createServerFn_handler = createServerRpc({
	id: "e04f692d7adf52ccd7b04b1cdc1b5e4ca6380ab95bf444ebb6f99387d4ae5ef5",
	name: "getMerchants",
	filename: "src/data/db.ts"
}, (opts) => getMerchants.__executeServer(opts));
var getMerchants = createServerFn({ method: "GET" }).handler(getMerchants_createServerFn_handler, async () => {
	return (await env.DB.prepare("SELECT DISTINCT merchant FROM transactions WHERE merchant IS NOT NULL ORDER BY merchant").all()).results.map((row) => row.merchant);
});
var getRule_createServerFn_handler = createServerRpc({
	id: "9f0cb89c18f3e088b89ebcc789a9ae4e82f4f4154ec12a00a6a9fa8d43a8978c",
	name: "getRule",
	filename: "src/data/db.ts"
}, (opts) => getRule.__executeServer(opts));
var getRule = createServerFn({ method: "GET" }).validator((merchant) => merchant).handler(getRule_createServerFn_handler, async ({ data: merchant }) => {
	const result = await env.DB.prepare("SELECT * FROM rules WHERE merchant = ?").bind(merchant).first();
	return result ? rowToRule(result) : null;
});
var getRules_createServerFn_handler = createServerRpc({
	id: "c01549b280dea00deadc12d6d1c788b8900c639d3ec9fdf2ff9543306074c31f",
	name: "getRules",
	filename: "src/data/db.ts"
}, (opts) => getRules.__executeServer(opts));
var getRules = createServerFn({ method: "GET" }).handler(getRules_createServerFn_handler, async () => {
	return (await env.DB.prepare("SELECT * FROM rules ORDER BY merchant").all()).results.map(rowToRule);
});
var saveRule_createServerFn_handler = createServerRpc({
	id: "9cacadc3b6645f00c41feac15ea6b3a5d0031272c9421670cd80548f06cf18a3",
	name: "saveRule",
	filename: "src/data/db.ts"
}, (opts) => saveRule.__executeServer(opts));
var saveRule = createServerFn({ method: "POST" }).validator((rule) => rule).handler(saveRule_createServerFn_handler, async ({ data: rule }) => {
	if (!validRule({
		merchant: rule.merchant,
		category: rule.category
	})) return {
		success: false,
		message: "Error saving rule: invalid rule"
	};
	try {
		await env.DB.prepare("INSERT INTO rules (merchant, category) VALUES (?, ?)").bind(rule.merchant, rule.category).run();
		return {
			success: true,
			message: "Saved rule"
		};
	} catch (error) {
		return {
			success: false,
			message: `Error saving rule: ${errorMessage(error)}`
		};
	}
});
var deleteRule_createServerFn_handler = createServerRpc({
	id: "b677081ebc70ece16f17c515ee08eb90665546835fe7514659e60d0995d247fc",
	name: "deleteRule",
	filename: "src/data/db.ts"
}, (opts) => deleteRule.__executeServer(opts));
var deleteRule = createServerFn({ method: "POST" }).validator((id) => id).handler(deleteRule_createServerFn_handler, async ({ data: id }) => {
	await env.DB.prepare("DELETE FROM rules WHERE id = ?").bind(id).run();
});
var getTransactions_createServerFn_handler = createServerRpc({
	id: "a0913d583c2792770ce9c60f7c3c951275381030ca01103bd8c9b456e014fabd",
	name: "getTransactions",
	filename: "src/data/db.ts"
}, (opts) => getTransactions.__executeServer(opts));
var getTransactions = createServerFn({ method: "GET" }).validator((filter) => filter).handler(getTransactions_createServerFn_handler, async ({ data: filter }) => {
	const conditions = [];
	const params = [];
	if (filter.month !== void 0) {
		conditions.push("month = ?");
		params.push(filter.month);
	}
	if (filter.year !== void 0) {
		conditions.push("year = ?");
		params.push(filter.year);
	}
	if (filter.skipped !== void 0) {
		conditions.push("skipped = ?");
		params.push(filter.skipped ? 1 : 0);
	}
	if (filter.reviewed !== void 0) {
		conditions.push("reviewed = ?");
		params.push(filter.reviewed ? 1 : 0);
	}
	if (filter.category !== void 0) {
		conditions.push("category = ?");
		params.push(filter.category);
	}
	if (filter.account !== void 0) {
		conditions.push("account = ?");
		params.push(filter.account);
	}
	let sql = "SELECT * FROM transactions";
	if (conditions.length > 0) sql += " WHERE " + conditions.join(" AND ");
	sql += " ORDER BY month, day";
	let transactions = (await env.DB.prepare(sql).bind(...params).all()).results.map(rowToTransaction);
	if (filter.tag) transactions = transactions.filter((t) => t.tags?.includes(filter.tag));
	return transactions;
});
var saveTransaction_createServerFn_handler = createServerRpc({
	id: "ff16b5c7e12c82fff015cd7e021ba76974ead0a16668dfe0e0e16bfc4d8a941a",
	name: "saveTransaction",
	filename: "src/data/db.ts"
}, (opts) => saveTransaction.__executeServer(opts));
var saveTransaction = createServerFn({ method: "POST" }).validator((tx) => tx).handler(saveTransaction_createServerFn_handler, async ({ data: tx }) => {
	if (!validTransaction(tx)) return {
		success: false,
		message: "Error saving transaction: invalid transaction"
	};
	try {
		await env.DB.prepare(INSERT_TRANSACTION_SQL).bind(...bindTransaction(tx)).run();
		return {
			success: true,
			message: "Saved transaction"
		};
	} catch (error) {
		return {
			success: false,
			message: `Error saving transaction: ${errorMessage(error)}`
		};
	}
});
function buildMessage(savedCount, skippedCount, processResult) {
	const parts = [];
	parts.push(`Imported ${savedCount} transactions`);
	if (skippedCount > 0) parts.push(`${skippedCount} duplicates skipped`);
	if (processResult.mergedCount > 0) parts.push(`${processResult.mergedCount} merged`);
	if (processResult.invalidCount > 0) parts.push(`${processResult.invalidCount} invalid`);
	return parts.join(", ");
}
var importCSV_createServerFn_handler = createServerRpc({
	id: "fb9b23783c0cbee97ae260bf0572799a93bc4f00ca2ab22ca007903a2ab07086",
	name: "importCSV",
	filename: "src/data/db.ts"
}, (opts) => importCSV.__executeServer(opts));
var importCSV = createServerFn({ method: "POST" }).validator((input) => input).handler(importCSV_createServerFn_handler, async ({ data: { csv, account } }) => {
	const processResult = process(csv, account);
	const invalid = processResult.transactions.filter((t) => !validTransaction(t));
	if (invalid.length > 0) return `Error: ${invalid.length} transactions are not valid`;
	const allKeys = processResult.transactions.map((tx) => tx.key);
	const existingKeys = /* @__PURE__ */ new Set();
	const BATCH_LIMIT = 100;
	for (let i = 0; i < allKeys.length; i += BATCH_LIMIT) {
		const batch = allKeys.slice(i, i + BATCH_LIMIT);
		const placeholders = batch.map(() => "?").join(", ");
		const result = await env.DB.prepare(`SELECT key FROM transactions WHERE key IN (${placeholders})`).bind(...batch).all();
		for (const row of result.results) existingKeys.add(row.key);
	}
	const newTransactions = processResult.transactions.filter((tx) => !existingKeys.has(tx.key));
	const skippedCount = processResult.transactions.length - newTransactions.length;
	if (newTransactions.length === 0) return buildMessage(0, skippedCount, processResult);
	const { unmatched } = applyImportRules(newTransactions);
	try {
		const stmts = newTransactions.map((tx) => env.DB.prepare(INSERT_TRANSACTION_SQL).bind(...bindTransaction(tx)));
		await env.DB.batch(stmts);
	} catch (error) {
		return `Error saving transactions: ${errorMessage(error)}`;
	}
	const toQueue = unmatched.filter((tx) => !tx.merchant);
	for (let i = 0; i < toQueue.length; i += BATCH_LIMIT) try {
		await env.QUEUE.sendBatch(toQueue.slice(i, i + BATCH_LIMIT).map((tx) => ({ body: {
			key: tx.key,
			description: tx.description
		} })));
	} catch (error) {
		console.error(`Error queuing merchant suggestions: ${errorMessage(error)}`);
	}
	return buildMessage(newTransactions.length, skippedCount, processResult);
});
var requeueUnreviewedTransactions_createServerFn_handler = createServerRpc({
	id: "f67e3fec101e7d2a979ca15dfad88218ccb80046286a8e6190709bb7ab5aac1e",
	name: "requeueUnreviewedTransactions",
	filename: "src/data/db.ts"
}, (opts) => requeueUnreviewedTransactions.__executeServer(opts));
var requeueUnreviewedTransactions = createServerFn({ method: "POST" }).handler(requeueUnreviewedTransactions_createServerFn_handler, async () => {
	const result = await env.DB.prepare("SELECT key, description FROM transactions WHERE reviewed = 0 ORDER BY id").all();
	if (result.results.length === 0) return "No un-reviewed transactions to re-queue";
	const BATCH_LIMIT = 100;
	let queuedCount = 0;
	try {
		for (let i = 0; i < result.results.length; i += BATCH_LIMIT) {
			const batch = result.results.slice(i, i + BATCH_LIMIT);
			await env.QUEUE.sendBatch(batch.map((transaction) => ({ body: {
				key: transaction.key,
				description: transaction.description
			} })));
			queuedCount += batch.length;
		}
	} catch (error) {
		return `Re-queued ${queuedCount} transactions before an error occurred: ${errorMessage(error)}`;
	}
	return `Re-queued ${queuedCount} un-reviewed transactions`;
});
var updateTransaction_createServerFn_handler = createServerRpc({
	id: "86ed5591308b5d9fd9ff5d99bbce7a9636e536d83ffbfbfc4497956b7829acae",
	name: "updateTransaction",
	filename: "src/data/db.ts"
}, (opts) => updateTransaction.__executeServer(opts));
var updateTransaction = createServerFn({ method: "POST" }).validator((tx) => tx).handler(updateTransaction_createServerFn_handler, async ({ data: tx }) => {
	if (!tx.id) return {
		success: false,
		message: "Error updating transaction: no id"
	};
	if (!validTransaction(tx)) return {
		success: false,
		message: "Error updating transaction: invalid transaction"
	};
	try {
		await env.DB.prepare(`UPDATE transactions SET key = ?, day = ?, month = ?, year = ?, amount = ?, credit = ?, merchant = ?, category = ?, account = ?, description = ?, notes = ?, tags = ?, skipped = ?, reviewed = ? WHERE id = ?`).bind(...bindTransaction(tx), tx.id).run();
		return {
			success: true,
			message: "Transaction updated"
		};
	} catch (error) {
		return {
			success: false,
			message: `Error updating transaction: ${errorMessage(error)}`
		};
	}
});
var deleteTransaction_createServerFn_handler = createServerRpc({
	id: "85b30c18782205bb0db0c48fae137c70c1396a471a6f6bfd1774ba6baa6a8a8b",
	name: "deleteTransaction",
	filename: "src/data/db.ts"
}, (opts) => deleteTransaction.__executeServer(opts));
var deleteTransaction = createServerFn({ method: "POST" }).validator((id) => id).handler(deleteTransaction_createServerFn_handler, async ({ data: id }) => {
	await env.DB.prepare("DELETE FROM transactions WHERE id = ?").bind(id).run();
});
var getSummary_createServerFn_handler = createServerRpc({
	id: "ede875e3001df9ff903f1c674ccadc62b3cac2e5242da99427ffd73f8cffaadc",
	name: "getSummary",
	filename: "src/data/db.ts"
}, (opts) => getSummary.__executeServer(opts));
var getSummary = createServerFn({ method: "GET" }).validator((year) => year).handler(getSummary_createServerFn_handler, async ({ data: year }) => {
	const transactions = (await env.DB.prepare("SELECT * FROM transactions WHERE year = ? AND skipped = 0 AND reviewed = 1").bind(year).all()).results.map(rowToTransaction);
	const result = { items: [] };
	for (const month of Object.values(Month)) {
		const newItem = {
			month,
			categories: [],
			groups: [],
			totals: {
				income: 0,
				spending: 0,
				expected: 0
			}
		};
		const transactionsForMonth = transactions.filter((t) => t.month === getMonthNumber(month));
		const income = transactionsForMonth.filter((t) => Groups[t.category] === Group.INCOME).reduce((acc, t) => acc + t.amount, 0);
		newItem.totals = {
			income,
			spending: transactionsForMonth.filter((t) => [Group.ESSENTIAL, Group.ELECTIVE].includes(Groups[t.category])).reduce((acc, t) => acc + t.amount, 0),
			expected: income * .2
		};
		Object.values(Category).forEach((category) => {
			const total = transactionsForMonth.filter((t) => t.category === category).reduce((acc, t) => acc + t.amount, 0);
			newItem.categories.push({
				category,
				total
			});
		});
		Object.values(Groups).forEach((group) => {
			const total = newItem.categories.filter((c) => Groups[c.category] === group).reduce((acc, c) => acc + c.total, 0);
			newItem.groups.push({
				group,
				total,
				expected: expectedBudget(income, group)
			});
		});
		result.items.push(newItem);
	}
	return result;
});
function expectedBudget(total, group) {
	switch (group) {
		case Group.ESSENTIAL: return total * .5;
		case Group.ELECTIVE: return total * .3;
	}
	return 0;
}
//#endregion
export { deleteRule_createServerFn_handler, deleteTransaction_createServerFn_handler, getMerchants_createServerFn_handler, getRule_createServerFn_handler, getRules_createServerFn_handler, getSummary_createServerFn_handler, getTransactions_createServerFn_handler, importCSV_createServerFn_handler, requeueUnreviewedTransactions_createServerFn_handler, saveRule_createServerFn_handler, saveTransaction_createServerFn_handler, updateTransaction_createServerFn_handler };
