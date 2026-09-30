import { y as __toESM } from "./createServerFn-TpCK4c9B.js";
import { a as require_react, i as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
import { t as Account } from "./Types-Ci0UbdzN.js";
import { c as importCSV } from "./db-BP1alSrj.js";
import { t as Button, un as cn } from "./button-h36q7tklakhd38nx-D4x2gb7U.js";
import { i as FieldControl, o as Field, r as inputVariants, s as normalizeFieldError } from "./input-pehjmr1q131tz38w-DsbPfrm6.js";
import { t as AccountSelect } from "./AccountSelect-BH9vDsLy.js";
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/input-ikfimmpl5sngvh9s.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
function parsePx(value) {
	const parsed = Number.parseFloat(value);
	return Number.isNaN(parsed) ? 0 : parsed;
}
/**
* Measures the content height of a textarea and applies it as an explicit
* height, optionally clamped to `maxRows`. Handles box-sizing/borders and
* container width changes (rewrapping).
*/
function useTextareaAutoResize({ enabled, minRows, maxRows }) {
	const textareaRef = (0, import_react.useRef)(null);
	const enabledRef = (0, import_react.useRef)(enabled);
	enabledRef.current = enabled;
	const minRowsRef = (0, import_react.useRef)(minRows);
	minRowsRef.current = minRows;
	const maxRowsRef = (0, import_react.useRef)(maxRows);
	maxRowsRef.current = maxRows;
	const resize = (0, import_react.useCallback)(() => {
		const textarea = textareaRef.current;
		if (!enabledRef.current || !textarea || typeof window === "undefined") return;
		const style = window.getComputedStyle(textarea);
		const borders = parsePx(style.borderTopWidth) + parsePx(style.borderBottomWidth);
		const padding = parsePx(style.paddingTop) + parsePx(style.paddingBottom);
		const isBorderBox = style.boxSizing === "border-box";
		textarea.style.height = "auto";
		let height = isBorderBox ? textarea.scrollHeight + borders : textarea.scrollHeight - padding;
		const currentMinRows = minRowsRef.current;
		const currentMaxRows = maxRowsRef.current;
		if (currentMinRows > 0 || currentMaxRows && currentMaxRows > 0) {
			const fontSize = parsePx(style.fontSize);
			const rawLineHeight = style.lineHeight;
			const lineHeight = rawLineHeight === "normal" || rawLineHeight === "" ? fontSize * 1.2 : rawLineHeight.endsWith("px") ? parsePx(rawLineHeight) : parsePx(rawLineHeight) * fontSize;
			const boxSpacing = isBorderBox ? padding + borders : 0;
			const minHeight = lineHeight * currentMinRows + boxSpacing;
			height = Math.max(height, minHeight);
			if (currentMaxRows && currentMaxRows > 0) {
				const maxHeight = lineHeight * currentMaxRows + boxSpacing;
				if (height > maxHeight) {
					height = maxHeight;
					textarea.style.overflowY = "auto";
				} else textarea.style.overflowY = "hidden";
			} else textarea.style.overflowY = "hidden";
		} else textarea.style.overflowY = "hidden";
		textarea.style.height = `${height}px`;
	}, []);
	useIsomorphicLayoutEffect(() => {
		if (enabled) resize();
	});
	useIsomorphicLayoutEffect(() => {
		if (!enabled) return;
		const textarea = textareaRef.current;
		if (!textarea) return;
		let lastWidth = textarea.clientWidth;
		const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => {
			if (textarea.clientWidth !== lastWidth) {
				lastWidth = textarea.clientWidth;
				resize();
			}
		}) : null;
		observer?.observe(textarea);
		return () => {
			observer?.disconnect();
			textarea.style.height = "";
			textarea.style.overflowY = "";
		};
	}, [enabled, resize]);
	return {
		textareaRef,
		resize
	};
}
var InputArea = import_react.forwardRef((props, ref) => {
	const { className, onValueChange, size = "base", variant: variantProp, onChange, label, labelTooltip, description, error, autoResize = false, minRows = 1, maxRows, rows, ...inputProps } = props;
	if (variantProp === "error") console.warn("[Kumo InputArea]: variant=\"error\" is deprecated. Error styling is now automatically applied when the `error` prop is truthy. Simply remove the variant prop and pass an error message instead.");
	const variant = variantProp ?? (error ? "error" : "default");
	const { required } = inputProps;
	const { textareaRef, resize } = useTextareaAutoResize({
		enabled: autoResize,
		minRows,
		maxRows
	});
	const refCleanup = (0, import_react.useRef)(void 0);
	const setTextareaRef = (0, import_react.useCallback)((node) => {
		textareaRef.current = node;
		if (typeof ref === "function") if (node) refCleanup.current = ref(node);
		else if (refCleanup.current) {
			refCleanup.current();
			refCleanup.current = void 0;
		} else ref(null);
		else if (ref) ref.current = node;
	}, [ref, textareaRef]);
	const isControlled = inputProps.value !== void 0;
	const handleChange = (0, import_react.useCallback)((event) => {
		onChange?.(event);
		onValueChange?.(event.target.value);
		if (!isControlled) resize();
	}, [
		onChange,
		onValueChange,
		resize,
		isControlled
	]);
	const textareaClassName = cn(inputVariants({
		size,
		variant,
		focusIndicator: true
	}), "h-auto py-2", autoResize && "field-sizing-content w-full resize-none scroll-pb-2 [scrollbar-color:var(--color-kumo-line)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar-corner]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-kumo-line [&::-webkit-scrollbar-track]:my-2", className);
	if (label || error || description) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label,
		required,
		labelTooltip,
		description,
		error: normalizeFieldError(error),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, { render: (controlProps) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			...controlProps,
			ref: setTextareaRef,
			className: textareaClassName,
			onChange: handleChange,
			rows: autoResize ? minRows : rows,
			...inputProps
		}) })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		ref: setTextareaRef,
		className: textareaClassName,
		onChange: handleChange,
		rows: autoResize ? minRows : rows,
		...inputProps
	});
});
InputArea.displayName = "InputArea";
//#endregion
//#region src/routes/index.tsx?tsr-split=component
function ImportPage() {
	const [csv, setCsv] = (0, import_react.useState)("");
	const [account, setAccount] = (0, import_react.useState)(Account.CAPITAL_ONE_SAVOR);
	const [status, setStatus] = (0, import_react.useState)("");
	const handleSubmit = async () => {
		const result = await importCSV({ data: {
			csv,
			account
		} });
		setStatus(result);
		setCsv("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "page-standard-width",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputArea, {
				value: csv,
				onChange: (e) => setCsv(e.target.value),
				rows: 12,
				className: "w-full"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountSelect, {
					value: account,
					onSelect: setAccount
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleSubmit,
					children: "Submit"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: status })
			})
		]
	});
}
//#endregion
export { ImportPage as component };
