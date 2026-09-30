import { y as __toESM } from "./createServerFn-TpCK4c9B.js";
import { a as require_react, i as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
import { Bt as ownerDocument, Dt as getTarget, Kt as isHTMLElement, Qt as useIsoLayoutEffect, Zt as SafeReact, an as mergeProps, cn as useRenderElement, et as useStableCallback, i as useBaseUiId, k as useTimeout, nn as NOOP, r as Tooltip, sn as useRefWithInit, t as Button, tn as EMPTY_OBJECT, un as cn } from "./button-h36q7tklakhd38nx-D4x2gb7U.js";
//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@phosphor-icons/react/dist/defs/Info.es.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var a = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M108,84a16,16,0,1,1,16,16A16,16,0,0,1,108,84Zm128,44A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Zm-72,36.68V132a20,20,0,0,0-20-20,12,12,0,0,0-4,23.32V168a20,20,0,0,0,20,20,12,12,0,0,0,4-23.32Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M144,176a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176Zm88-48A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128ZM124,96a12,12,0,1,0-12-12A12,12,0,0,0,124,96Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M142,176a6,6,0,0,1-6,6,14,14,0,0,1-14-14V128a2,2,0,0,0-2-2,6,6,0,0,1,0-12,14,14,0,0,1,14,14v40a2,2,0,0,0,2,2A6,6,0,0,1,142,176ZM124,94a10,10,0,1,0-10-10A10,10,0,0,0,124,94Zm106,34A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M140,176a4,4,0,0,1-4,4,12,12,0,0,1-12-12V128a4,4,0,0,0-4-4,4,4,0,0,1,0-8,12,12,0,0,1,12,12v40a4,4,0,0,0,4,4A4,4,0,0,1,140,176ZM124,92a8,8,0,1,0-8-8A8,8,0,0,0,124,92Zm104,36A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128Z" }))]
]);
//#endregion
//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@phosphor-icons/react/dist/lib/context.es.js
var o = (0, import_react.createContext)({
	color: "currentColor",
	size: "1em",
	weight: "regular",
	mirrored: !1
});
//#endregion
//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@phosphor-icons/react/dist/lib/IconBase.es.js
var p = import_react.forwardRef((s, a) => {
	const { alt: n, color: r, size: t, weight: o$1, mirrored: c, children: i, weights: m, ...x } = s, { color: d = "currentColor", size: l, weight: f = "regular", mirrored: g = !1, ...w } = import_react.useContext(o);
	return /* @__PURE__ */ import_react.createElement("svg", {
		ref: a,
		xmlns: "http://www.w3.org/2000/svg",
		width: t != null ? t : l,
		height: t != null ? t : l,
		fill: r != null ? r : d,
		viewBox: "0 0 256 256",
		transform: c || g ? "scale(-1, 1)" : void 0,
		...w,
		...x
	}, !!n && /* @__PURE__ */ import_react.createElement("title", null, n), i, m.get(o$1 != null ? o$1 : f));
});
p.displayName = "IconBase";
//#endregion
//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@phosphor-icons/react/dist/csr/Info.es.js
var e = import_react.forwardRef((r, t) => /* @__PURE__ */ import_react.createElement(p, {
	ref: t,
	...r,
	weights: a
}));
e.displayName = "InfoIcon";
var c = e;
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/label-ie2gpde0nco1avi7.js
var import_jsx_runtime = require_jsx_runtime();
function labelVariants(_props = {}) {
	return cn("m-0 text-base font-medium text-kumo-default");
}
function labelContentVariants() {
	return cn("inline-flex items-center gap-1");
}
/**
* Label component for form fields.
*
* Provides a standardized way to display labels with optional indicators:
* - Optional indicator: gray "(optional)" text when `showOptional={true}`
* - Tooltip: info icon with hover tooltip for additional context
*
* @example
* // Basic label
* <Label>Email</Label>
*
* @example
* // Optional field with indicator
* <Label showOptional>Middle Name</Label>
*
* @example
* // With tooltip
* <Label tooltip="We'll use this to send you updates">Email</Label>
*
* @example
* // With ReactNode children
* <Label>
*   <span>Custom label with <strong>bold</strong> text</span>
* </Label>
*/
function Label({ children, showOptional = false, tooltip, className, htmlFor, asContent = false }) {
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		children,
		showOptional && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-normal text-kumo-subtle",
			children: "(optional)"
		}),
		tooltip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
			content: tooltip,
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "xs",
				shape: "square",
				"aria-label": "More information",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, { className: "size-4" })
			})
		})
	] });
	if (asContent) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(labelContentVariants(), className),
		children: content
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		htmlFor,
		className: cn(labelVariants(), labelContentVariants(), className),
		children: content
	});
}
Label.displayName = "Label";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/FieldsetRootContext-b633e9uzilttuyfi.js
var FieldsetRootContext = /*#__PURE__*/ import_react.createContext(void 0);
FieldsetRootContext.displayName = "FieldsetRootContext";
function useFieldsetRootContext(optional = false) {
	const context = import_react.useContext(FieldsetRootContext);
	if (!context && !optional) throw new Error("Base UI: FieldsetRootContext is missing. Fieldset parts must be placed within <Fieldset.Root>.");
	return context;
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/LabelableContext-hetas2e4y0kywfas.js
var FieldControlDataAttributes = /*#__PURE__*/ function(FieldControlDataAttributes) {
	/**
	* Present when the field is disabled.
	*/
	FieldControlDataAttributes["disabled"] = "data-disabled";
	/**
	* Present when the field is in a valid state.
	*/
	FieldControlDataAttributes["valid"] = "data-valid";
	/**
	* Present when the field is in an invalid state.
	*/
	FieldControlDataAttributes["invalid"] = "data-invalid";
	/**
	* Present when the field has been touched.
	*/
	FieldControlDataAttributes["touched"] = "data-touched";
	/**
	* Present when the field's value has changed.
	*/
	FieldControlDataAttributes["dirty"] = "data-dirty";
	/**
	* Present when the field is filled.
	*/
	FieldControlDataAttributes["filled"] = "data-filled";
	/**
	* Present when the field control is focused.
	*/
	FieldControlDataAttributes["focused"] = "data-focused";
	return FieldControlDataAttributes;
}({});
var DEFAULT_VALIDITY_STATE = {
	badInput: false,
	customError: false,
	patternMismatch: false,
	rangeOverflow: false,
	rangeUnderflow: false,
	stepMismatch: false,
	tooLong: false,
	tooShort: false,
	typeMismatch: false,
	valid: null,
	valueMissing: false
};
var DEFAULT_FIELD_STATE_ATTRIBUTES = {
	valid: null,
	touched: false,
	dirty: false,
	filled: false,
	focused: false
};
var DEFAULT_FIELD_ROOT_STATE = {
	disabled: false,
	...DEFAULT_FIELD_STATE_ATTRIBUTES
};
var fieldValidityMapping = { valid(value) {
	if (value === null) return null;
	if (value) return { [FieldControlDataAttributes.valid]: "" };
	return { [FieldControlDataAttributes.invalid]: "" };
} };
var DEFAULT_FIELD_ROOT_CONTEXT = {
	invalid: void 0,
	name: void 0,
	validityData: {
		state: DEFAULT_VALIDITY_STATE,
		errors: [],
		error: "",
		value: "",
		initialValue: null
	},
	setValidityData: NOOP,
	disabled: void 0,
	touched: DEFAULT_FIELD_STATE_ATTRIBUTES.touched,
	setTouched: NOOP,
	dirty: DEFAULT_FIELD_STATE_ATTRIBUTES.dirty,
	setDirty: NOOP,
	filled: DEFAULT_FIELD_STATE_ATTRIBUTES.filled,
	setFilled: NOOP,
	focused: DEFAULT_FIELD_STATE_ATTRIBUTES.focused,
	setFocused: NOOP,
	validate: () => null,
	validationMode: "onSubmit",
	validationDebounceTime: 0,
	shouldValidateOnChange: () => false,
	state: DEFAULT_FIELD_ROOT_STATE,
	markedDirtyRef: { current: false },
	registerFieldControl: NOOP,
	validation: {
		getValidationProps: (_disabled, props = EMPTY_OBJECT) => props,
		inputRef: { current: null },
		registerInput: NOOP,
		commit: async () => {},
		change: NOOP
	}
};
var FieldRootContext = /*#__PURE__*/ import_react.createContext(DEFAULT_FIELD_ROOT_CONTEXT);
FieldRootContext.displayName = "FieldRootContext";
function useFieldRootContext(optional = true) {
	const context = import_react.useContext(FieldRootContext);
	if (context.setValidityData === NOOP && !optional) throw new Error("Base UI: FieldRootContext is missing. Field parts must be placed within <Field.Root>.");
	return context;
}
/**
* A context for providing [labelable elements](https://html.spec.whatwg.org/multipage/forms.html#category-label)\
* with an accessible name (label) and description.
*/
var LabelableContext = /*#__PURE__*/ import_react.createContext({
	controlId: void 0,
	registerControlId: NOOP,
	labelId: void 0,
	setLabelId: NOOP,
	messageIds: [],
	setMessageIds: NOOP,
	getDescriptionProps: (externalProps) => externalProps
});
LabelableContext.displayName = "LabelableContext";
function useLabelableContext() {
	return import_react.useContext(LabelableContext);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/FormContext-xz0b4h7ue30fkkn1.js
var FormContext = /*#__PURE__*/ import_react.createContext({
	formRef: { current: { fields: /* @__PURE__ */ new Map() } },
	errors: {},
	clearErrors: NOOP,
	validationMode: "onSubmit",
	submitAttemptedRef: { current: false }
});
FormContext.displayName = "FormContext";
function useFormContext() {
	return import_react.useContext(FormContext);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/useRegisteredLabelId-dh83mybmzy75waje.js
function useRegisteredLabelId(idProp, setLabelId) {
	const id = useBaseUiId(idProp);
	useIsoLayoutEffect(() => {
		setLabelId(id);
		return () => {
			setLabelId(void 0);
		};
	}, [id, setLabelId]);
	return id;
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/useLabel-nh9hf8h7o6oquqn5.js
function useLabel(params = {}) {
	const { id: idProp, fallbackControlId, native = false, setLabelId: setLabelIdProp, focusControl: focusControlProp } = params;
	const { controlId: contextControlId, setLabelId: setContextLabelId } = useLabelableContext();
	const id = useRegisteredLabelId(idProp, useStableCallback((nextLabelId) => {
		setContextLabelId(nextLabelId);
		setLabelIdProp?.(nextLabelId);
	}));
	const resolvedControlId = contextControlId ?? fallbackControlId;
	function focusControl(event) {
		if (focusControlProp) {
			focusControlProp(event, resolvedControlId);
			return;
		}
		if (!resolvedControlId) return;
		const controlElement = ownerDocument(event.currentTarget).getElementById(resolvedControlId);
		if (isHTMLElement(controlElement)) focusElementWithVisible(controlElement);
	}
	function handleInteraction(event) {
		if (getTarget(event.nativeEvent)?.closest("button,input,select,textarea")) return;
		if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
		if (native) return;
		focusControl(event);
	}
	return native ? {
		id,
		htmlFor: resolvedControlId ?? void 0,
		onMouseDown: handleInteraction
	} : {
		id,
		onClick: handleInteraction,
		onPointerDown(event) {
			event.preventDefault();
		}
	};
}
function focusElementWithVisible(element) {
	element.focus({ focusVisible: true });
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/error-mm98alb8acdy93vq.js
var set = /* @__PURE__ */ new Set();
function error(...messages) {
	{
		const messageKey = messages.join(" ");
		if (!set.has(messageKey)) {
			set.add(messageKey);
			console.error(`Base UI: ${messageKey}`);
		}
	}
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/FieldItemContext-j85dc0ihramj5ezs.js
var FieldItemContext = /*#__PURE__*/ import_react.createContext({ disabled: false });
FieldItemContext.displayName = "FieldItemContext";
function useFieldItemContext() {
	return import_react.useContext(FieldItemContext);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/FieldLabel-f6vwzm8nefzxwlh8.js
/**
* @internal
*/
var LabelableProvider = function LabelableProvider(props) {
	const defaultId = useBaseUiId();
	const initialControlId = props.controlId === void 0 ? defaultId : props.controlId;
	const [controlId, setControlIdState] = import_react.useState(initialControlId);
	const [labelId, setLabelId] = import_react.useState(props.labelId);
	const [messageIds, setMessageIds] = import_react.useState([]);
	const registrationsRef = useRefWithInit(() => /* @__PURE__ */ new Map());
	const { messageIds: parentMessageIds } = useLabelableContext();
	const registerControlId = useStableCallback((source, nextId) => {
		const registrations = registrationsRef.current;
		if (nextId === void 0) {
			registrations.delete(source);
			return;
		}
		registrations.set(source, nextId);
		setControlIdState((prev) => {
			if (registrations.size === 0) return;
			let nextControlId;
			for (const id of registrations.values()) {
				if (prev !== void 0 && id === prev) return prev;
				if (nextControlId === void 0) nextControlId = id;
			}
			return nextControlId;
		});
	});
	const getDescriptionProps = import_react.useCallback((externalProps) => {
		const ids = externalProps["aria-describedby"] ? externalProps["aria-describedby"].split(" ") : [];
		ids.push(...parentMessageIds, ...messageIds);
		return {
			...externalProps,
			"aria-describedby": Array.from(new Set(ids)).join(" ") || void 0
		};
	}, [parentMessageIds, messageIds]);
	const contextValue = import_react.useMemo(() => ({
		controlId,
		registerControlId,
		labelId,
		setLabelId,
		messageIds,
		setMessageIds,
		getDescriptionProps
	}), [
		controlId,
		registerControlId,
		labelId,
		setLabelId,
		messageIds,
		setMessageIds,
		getDescriptionProps
	]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LabelableContext.Provider, {
		value: contextValue,
		children: props.children
	});
};
LabelableProvider.displayName = "LabelableProvider";
/**
* Combines the field's client-side, stateful validity data with the external invalid state to
* determine the field's true validity.
*/
function getCombinedFieldValidityData(validityData, invalid) {
	return {
		...validityData,
		state: {
			...validityData.state,
			valid: !invalid && validityData.state.valid
		}
	};
}
var validityKeys = Object.keys(DEFAULT_VALIDITY_STATE);
function isOnlyValueMissing(state) {
	if (!state || state.valid || !state.valueMissing) return false;
	let onlyValueMissing = false;
	for (const key of validityKeys) {
		if (key === "valid") continue;
		if (key === "valueMissing") onlyValueMissing = state[key];
		else if (state[key]) onlyValueMissing = false;
	}
	return onlyValueMissing;
}
/**
* Picks the input whose native validity should represent a field that owns several inputs (such as a
* checkbox group). Prefers the first enabled currently-invalid input, where "first" follows Set
* insertion order (mount order), and otherwise returns the first enabled input. Disabled inputs are
* skipped because they don't participate in native constraint validation.
*/
function findRepresentativeInput(inputs) {
	let fallback = null;
	for (const input of inputs) {
		if (input.disabled) continue;
		if (!input.validity.valid) return input;
		fallback ??= input;
	}
	return fallback;
}
function clearCustomValidity(element, inputs) {
	let didClearElement = false;
	for (const input of inputs) {
		input.setCustomValidity("");
		didClearElement ||= input === element;
	}
	if (!didClearElement) element.setCustomValidity("");
}
function useFieldValidation(params) {
	const { formRef } = useFormContext();
	const { setValidityData, validate, validityData, validationDebounceTime, invalid, markedDirtyRef, state, shouldValidateOnChange, getRegisteredFieldId } = params;
	const { controlId, getDescriptionProps } = useLabelableContext();
	const timeout = useTimeout();
	const inputRef = import_react.useRef(null);
	const registeredInputs = useRefWithInit(() => /* @__PURE__ */ new Set()).current;
	const validationCommitIdRef = import_react.useRef(0);
	const registerInput = import_react.useCallback((element) => {
		if (!element) return;
		registeredInputs.add(element);
		return () => {
			registeredInputs.delete(element);
		};
	}, [registeredInputs]);
	const commit = useStableCallback(async (value, revalidate = false) => {
		const element = findRepresentativeInput(registeredInputs) ?? inputRef.current;
		if (!element) return;
		validationCommitIdRef.current += 1;
		const validationCommitId = validationCommitIdRef.current;
		function updateRegisteredFieldValidity(nextValidityData, externalInvalid = invalid) {
			const fieldId = getRegisteredFieldId() ?? controlId;
			if (fieldId == null) return;
			const currentFieldData = formRef.current.fields.get(fieldId);
			if (!currentFieldData) return;
			const validityDataWithFormErrors = getCombinedFieldValidityData(nextValidityData, externalInvalid);
			formRef.current.fields.set(fieldId, {
				...currentFieldData,
				validityData: validityDataWithFormErrors
			});
		}
		if (revalidate) {
			if (state.valid !== false) return;
			const currentNativeValidity = element.validity;
			if (!currentNativeValidity.valueMissing) {
				const nextValidityData = {
					value,
					state: {
						...DEFAULT_VALIDITY_STATE,
						valid: true
					},
					error: "",
					errors: [],
					initialValue: validityData.initialValue
				};
				clearCustomValidity(element, registeredInputs);
				updateRegisteredFieldValidity(nextValidityData, false);
				setValidityData(nextValidityData);
				return;
			}
			const currentNativeValidityObject = validityKeys.reduce((acc, key) => {
				acc[key] = currentNativeValidity[key];
				return acc;
			}, {});
			if (!currentNativeValidityObject.valid && !isOnlyValueMissing(currentNativeValidityObject)) return;
		}
		function getState(el) {
			const computedState = validityKeys.reduce((acc, key) => {
				acc[key] = el.validity[key];
				return acc;
			}, {});
			let hasOnlyValueMissingError = false;
			for (const key of validityKeys) {
				if (key === "valid") continue;
				if (key === "valueMissing" && computedState[key]) hasOnlyValueMissingError = true;
				else if (computedState[key]) return computedState;
			}
			if (hasOnlyValueMissingError && !markedDirtyRef.current) {
				computedState.valid = true;
				computedState.valueMissing = false;
			}
			return computedState;
		}
		timeout.clear();
		let result = null;
		let validationErrors = [];
		const nextState = getState(element);
		let defaultValidationMessage;
		const isValidatingOnChange = shouldValidateOnChange();
		if (element.validationMessage && !isValidatingOnChange) {
			defaultValidationMessage = element.validationMessage;
			validationErrors = [element.validationMessage];
		} else {
			const formValues = Array.from(formRef.current.fields.values()).reduce((acc, field) => {
				if (field.name) acc[field.name] = field.getValue();
				return acc;
			}, {});
			const resultOrPromise = validate(value, formValues);
			if (typeof resultOrPromise === "object" && resultOrPromise !== null && "then" in resultOrPromise) {
				result = await resultOrPromise;
				if (validationCommitId !== validationCommitIdRef.current) return;
			} else result = resultOrPromise;
			if (result !== null) {
				nextState.valid = false;
				nextState.customError = true;
				if (Array.isArray(result)) {
					validationErrors = result;
					element.setCustomValidity(result.join("\n"));
				} else if (result) {
					validationErrors = [result];
					element.setCustomValidity(result);
				}
			} else if (isValidatingOnChange) {
				clearCustomValidity(element, registeredInputs);
				nextState.customError = false;
				if (element.validationMessage) {
					defaultValidationMessage = element.validationMessage;
					validationErrors = [element.validationMessage];
				} else if (element.validity.valid && !nextState.valid) nextState.valid = true;
			}
		}
		const nextValidityData = {
			value,
			state: nextState,
			error: defaultValidationMessage ?? (Array.isArray(result) ? result[0] : result ?? ""),
			errors: validationErrors,
			initialValue: validityData.initialValue
		};
		updateRegisteredFieldValidity(nextValidityData);
		setValidityData(nextValidityData);
	});
	const change = useStableCallback((value) => {
		timeout.clear();
		const validateOnChange = shouldValidateOnChange();
		if (validateOnChange && value !== "" && validationDebounceTime) {
			validationCommitIdRef.current += 1;
			timeout.start(validationDebounceTime, () => {
				commit(value);
			});
		} else commit(value, !validateOnChange);
	});
	const getValidationProps = import_react.useCallback((disabled, externalProps = {}) => mergeProps(getDescriptionProps(externalProps), state.valid === false && !state.disabled && !disabled ? { "aria-invalid": true } : EMPTY_OBJECT), [
		getDescriptionProps,
		state.disabled,
		state.valid
	]);
	return import_react.useMemo(() => ({
		getValidationProps,
		inputRef,
		registerInput,
		commit,
		change
	}), [
		getValidationProps,
		registerInput,
		commit,
		change
	]);
}
function useFieldControlRegistration(params) {
	const { commit, invalid, markedDirtyRef, name, setRegisteredFieldName, setRegisteredFieldId, setValidityData, validityData } = params;
	const { formRef } = useFormContext();
	const activeFieldControlSourceRef = import_react.useRef(null);
	const registrationRef = import_react.useRef(null);
	const fallbackControlRef = import_react.useRef(null);
	const getValueForForm = useStableCallback(() => {
		const registration = registrationRef.current;
		if (!registration) return;
		if (registration.getValue) return registration.getValue();
		return registration.value;
	});
	function getRegistrationValue(registration) {
		return registration.value === void 0 ? getValueForForm() : registration.value;
	}
	const validate = useStableCallback(() => {
		const registration = registrationRef.current;
		markedDirtyRef.current = true;
		if (!registration) {
			commit(validityData.value);
			return;
		}
		commit(getRegistrationValue(registration));
	});
	function refreshRegistration() {
		const registration = registrationRef.current;
		if (!registration || !registration.id) return;
		formRef.current.fields.set(registration.id, {
			getValue: getValueForForm,
			name: name ?? registration.name,
			controlRef: registration.controlRef ?? fallbackControlRef,
			validityData: getCombinedFieldValidityData(validityData, invalid),
			validate
		});
	}
	function deleteRegistration(id = registrationRef.current?.id) {
		if (id) formRef.current.fields.delete(id);
	}
	function syncInitialValue() {
		const registration = registrationRef.current;
		if (!registration) return;
		const initialValue = getRegistrationValue(registration);
		if (validityData.initialValue === null && initialValue !== null) setValidityData((prev) => ({
			...prev,
			initialValue
		}));
	}
	useIsoLayoutEffect(() => {
		const registration = registrationRef.current;
		if (!registration || !registration.id) return;
		setRegisteredFieldName(name ? void 0 : registration.name);
		formRef.current.fields.set(registration.id, {
			getValue: getValueForForm,
			name: name ?? registration.name,
			controlRef: registration.controlRef ?? fallbackControlRef,
			validityData: getCombinedFieldValidityData(validityData, invalid),
			validate
		});
	}, [
		formRef,
		getValueForForm,
		invalid,
		name,
		setRegisteredFieldName,
		validate,
		validityData
	]);
	useIsoLayoutEffect(() => {
		const fields = formRef.current.fields;
		return () => {
			const id = registrationRef.current?.id;
			if (id) fields.delete(id);
		};
	}, [formRef]);
	return [validate, useStableCallback((source, registration) => {
		if (!registration) {
			if (activeFieldControlSourceRef.current === source) {
				activeFieldControlSourceRef.current = null;
				deleteRegistration();
				registrationRef.current = null;
				setRegisteredFieldName(void 0);
				setRegisteredFieldId(void 0);
			}
			return;
		}
		const previousId = registrationRef.current?.id;
		activeFieldControlSourceRef.current = source;
		registrationRef.current = registration;
		if (!name) setRegisteredFieldName(registration.name);
		setRegisteredFieldId(registration.id);
		if (previousId && previousId !== registration.id) deleteRegistration(previousId);
		syncInitialValue();
		refreshRegistration();
	})];
}
/**
* @internal
*/
var FieldRootInner = /*#__PURE__*/ import_react.forwardRef(function FieldRootInner(componentProps, forwardedRef) {
	const { errors, validationMode: formValidationMode, submitAttemptedRef } = useFormContext();
	const { render, className, validate: validateProp, validationDebounceTime = 0, validationMode = formValidationMode, name, disabled: disabledProp = false, invalid: invalidProp, dirty: dirtyProp, touched: touchedProp, actionsRef, style, ...elementProps } = componentProps;
	const disabledFieldset = useFieldsetRootContext(true)?.disabled;
	const validate = useStableCallback(validateProp || (() => null));
	const disabled = disabledFieldset || disabledProp;
	const [touchedState, setTouchedUnwrapped] = import_react.useState(false);
	const [dirtyState, setDirtyUnwrapped] = import_react.useState(false);
	const [filled, setFilled] = import_react.useState(false);
	const [focused, setFocused] = import_react.useState(false);
	const dirty = dirtyProp ?? dirtyState;
	const touched = touchedProp ?? touchedState;
	const markedDirtyRef = import_react.useRef(dirty);
	const registeredFieldIdRef = import_react.useRef(void 0);
	const [registeredFieldName, setRegisteredFieldName] = import_react.useState();
	const effectiveName = name ?? registeredFieldName;
	useIsoLayoutEffect(() => {
		if (dirtyProp !== void 0) markedDirtyRef.current = dirtyProp;
	}, [dirtyProp]);
	const getRegisteredFieldId = import_react.useCallback(() => registeredFieldIdRef.current, []);
	const setRegisteredFieldId = import_react.useCallback((id) => {
		registeredFieldIdRef.current = id;
	}, []);
	const setDirty = useStableCallback((value) => {
		if (dirtyProp !== void 0) return;
		if (value) markedDirtyRef.current = true;
		setDirtyUnwrapped(value);
	});
	const setTouched = useStableCallback((value) => {
		if (touchedProp !== void 0) return;
		setTouchedUnwrapped(value);
	});
	const shouldValidateOnChange = useStableCallback(() => validationMode === "onChange" || validationMode === "onSubmit" && submitAttemptedRef.current);
	const formError = effectiveName && Object.hasOwn(errors, effectiveName) ? errors[effectiveName] : null;
	const hasFormError = !!(Array.isArray(formError) ? formError.length : formError);
	const invalid = invalidProp === true || hasFormError;
	const [validityData, setValidityData] = import_react.useState({
		state: DEFAULT_VALIDITY_STATE,
		error: "",
		errors: [],
		value: null,
		initialValue: null
	});
	const valid = disabled ? null : !invalid && validityData.state.valid;
	const state = import_react.useMemo(() => ({
		disabled,
		touched,
		dirty,
		valid,
		filled,
		focused
	}), [
		disabled,
		touched,
		dirty,
		valid,
		filled,
		focused
	]);
	const validation = useFieldValidation({
		setValidityData,
		validate,
		validityData,
		validationDebounceTime,
		invalid,
		markedDirtyRef,
		state,
		shouldValidateOnChange,
		getRegisteredFieldId
	});
	const [validateFieldControl, registerFieldControl] = useFieldControlRegistration({
		commit: validation.commit,
		invalid,
		markedDirtyRef,
		name,
		setRegisteredFieldName,
		setRegisteredFieldId,
		setValidityData,
		validityData
	});
	import_react.useImperativeHandle(actionsRef, () => ({ validate: validateFieldControl }), [validateFieldControl]);
	const contextValue = import_react.useMemo(() => ({
		invalid,
		name: effectiveName,
		validityData,
		setValidityData,
		disabled,
		touched,
		setTouched,
		dirty,
		setDirty,
		filled,
		setFilled,
		focused,
		setFocused,
		validate,
		validationMode,
		validationDebounceTime,
		shouldValidateOnChange,
		state,
		markedDirtyRef,
		registerFieldControl,
		validation
	}), [
		invalid,
		effectiveName,
		validityData,
		disabled,
		touched,
		setTouched,
		dirty,
		setDirty,
		filled,
		setFilled,
		focused,
		setFocused,
		validate,
		validationMode,
		validationDebounceTime,
		shouldValidateOnChange,
		state,
		registerFieldControl,
		validation
	]);
	const element = useRenderElement("div", componentProps, {
		ref: forwardedRef,
		state,
		props: elementProps,
		stateAttributesMapping: fieldValidityMapping
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldRootContext.Provider, {
		value: contextValue,
		children: element
	});
});
FieldRootInner.displayName = "FieldRootInner";
var FieldRoot = /*#__PURE__*/ import_react.forwardRef(function FieldRoot(componentProps, forwardedRef) {
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LabelableProvider, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldRootInner, {
		...componentProps,
		ref: forwardedRef
	}) });
});
FieldRoot.displayName = "FieldRoot";
/**
* An accessible label that is automatically associated with the field control.
* Renders a `<label>` element.
*
* Documentation: [Base UI Field](https://base-ui.com/react/components/field)
*/
var FieldLabel = /*#__PURE__*/ import_react.forwardRef(function FieldLabel(componentProps, forwardedRef) {
	const { render, className, style, id: idProp, nativeLabel = true, ...elementProps } = componentProps;
	const fieldRootContext = useFieldRootContext(false);
	const fieldItemContext = useFieldItemContext();
	const { labelId } = useLabelableContext();
	const state = {
		...fieldRootContext.state,
		disabled: fieldRootContext.disabled || fieldItemContext.disabled
	};
	const labelRef = import_react.useRef(null);
	const labelProps = useLabel({
		id: labelId ?? idProp,
		native: nativeLabel
	});
	import_react.useEffect(() => {
		if (!labelRef.current) return;
		const isLabelTag = labelRef.current.tagName === "LABEL";
		if (nativeLabel) {
			if (!isLabelTag) error(`<Field.Label> expected a <label> element because the \`nativeLabel\` prop is true. Rendering a non-<label> disables native label association, so \`htmlFor\` will not work. Use a real <label> in the \`render\` prop, or set \`nativeLabel\` to \`false\`.${SafeReact.captureOwnerStack?.() || ""}`);
		} else if (isLabelTag) error(`<Field.Label> expected a non-<label> element because the \`nativeLabel\` prop is false. Rendering a <label> assumes native label behavior while Base UI treats it as non-native, which can cause unexpected pointer behavior. Use a non-<label> in the \`render\` prop, or set \`nativeLabel\` to \`true\`.${SafeReact.captureOwnerStack?.() || ""}`);
	}, [nativeLabel]);
	return useRenderElement("label", componentProps, {
		ref: [forwardedRef, labelRef],
		state,
		props: [labelProps, elementProps],
		stateAttributesMapping: fieldValidityMapping
	});
});
FieldLabel.displayName = "FieldLabel";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/useControlled-nlx0kk1ksgk0auvi.js
function useControlled({ controlled, default: defaultProp, name, state = "value" }) {
	const { current: isControlled } = import_react.useRef(controlled !== void 0);
	const [valueState, setValue] = import_react.useState(defaultProp);
	const value = isControlled ? controlled : valueState;
	{
		import_react.useEffect(() => {
			if (isControlled !== (controlled !== void 0)) error([
				`A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`,
				"Elements should not switch from uncontrolled to controlled (or vice versa).",
				`Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`,
				"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
				"More info: https://fb.me/react-controlled-components"
			].join("\n"));
		}, [
			state,
			name,
			controlled
		]);
		const { current: defaultValue } = import_react.useRef(defaultProp);
		import_react.useEffect(() => {
			if (!isControlled && serializeToDevModeString(defaultValue) !== serializeToDevModeString(defaultProp)) error([`A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. To suppress this warning opt to use a controlled ${name}.`].join("\n"));
		}, [defaultProp]);
	}
	return [value, import_react.useCallback((newValue) => {
		if (!isControlled) setValue(newValue);
	}, [])];
}
function serializeToDevModeString(input) {
	let nextId = 0;
	const seen = /* @__PURE__ */ new WeakMap();
	try {
		return JSON.stringify(input, function replacer(key, value) {
			if (key === "_owner" && this != null && typeof this === "object" && "$$typeof" in this) return;
			if (typeof value === "bigint") return `__bigint__:${value}`;
			if (value !== null && typeof value === "object") {
				const id = seen.get(value);
				if (id !== void 0) return `__object__:${id}`;
				seen.set(value, nextId);
				nextId += 1;
			}
			return value;
		}) ?? `__top__:${typeof input}`;
	} catch {
		return "__unserializable__";
	}
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/useRegisterFieldControl-m1rxsuvtpau2341n.js
function useRegisterFieldControl(controlRef, id, value, getFormValueOverride, enabled = true, name) {
	const { registerFieldControl } = useFieldRootContext();
	const sourceRef = import_react.useRef(null);
	if (!sourceRef.current) sourceRef.current = Symbol();
	useIsoLayoutEffect(() => {
		const source = sourceRef.current;
		if (!source || !enabled) return;
		registerFieldControl(source, {
			controlRef,
			getValue: getFormValueOverride,
			id,
			name,
			value
		});
		return () => {
			registerFieldControl(source, void 0);
		};
	}, [
		controlRef,
		enabled,
		getFormValueOverride,
		id,
		name,
		registerFieldControl,
		value
	]);
}
//#endregion
export { useFieldItemContext as a, useFormContext as c, useLabelableContext as d, FieldsetRootContext as f, p as h, FieldRoot as i, fieldValidityMapping as l, Label as m, useControlled as n, error as o, useFieldsetRootContext as p, FieldLabel as r, useLabel as s, useRegisterFieldControl as t, useFieldRootContext as u };
