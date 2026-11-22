import { y as __toESM } from "./createServerFn-TpCK4c9B.js";
import { a as require_react, i as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
import { P as useTimeout, Rt as ownerDocument, Tt as getTarget, Yt as isHTMLElement, Z as useStableCallback, Zt as isShadowRoot, an as NOOP, c as useBaseUiId, dn as useRefWithInit, en as SafeReact, fn as useRenderElement, gt as closest, hn as cn, in as EMPTY_OBJECT, ln as mergeProps, on as createLogOnce, r as Tooltip, t as Button, tn as useIsoLayoutEffect } from "./button-hzvowfkbathmx8yg-Ddqo88Fb.js";
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
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/locale-provider-j4ii538ntyok36r6.js
var import_jsx_runtime = require_jsx_runtime();
var KumoLocaleContext = (0, import_react.createContext)({
	breadcrumbs: {
		label: "breadcrumb",
		copy: "Copy",
		copyTooltip: "Click to copy"
	},
	label: {
		optional: "(optional)",
		tooltip: "More information"
	},
	layerDialog: {
		close: "Close",
		cancel: "Cancel"
	}
});
/** @internal Used by Kumo components to resolve translated built-in copy. */
function useKumoLocale() {
	return (0, import_react.useContext)(KumoLocaleContext);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/label-f18fnpbv85jddo4q.js
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
function Label({ children, showOptional = false, optionalLabel, tooltip, tooltipAriaLabel, className, htmlFor, asContent = false }) {
	const { label } = useKumoLocale();
	const resolvedOptionalLabel = optionalLabel === void 0 ? label.optional : optionalLabel;
	const resolvedTooltipLabel = tooltipAriaLabel ?? label.tooltip;
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		children,
		showOptional && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-normal text-kumo-subtle",
			children: resolvedOptionalLabel
		}),
		tooltip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
			content: tooltip,
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "xs",
				shape: "square",
				"aria-label": resolvedTooltipLabel,
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
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/FieldsetRootContext-fphwizvcm55ydg94.js
var FieldsetRootContext = /*#__PURE__*/ import_react.createContext(void 0);
FieldsetRootContext.displayName = "FieldsetRootContext";
function useFieldsetRootContext(optional = false) {
	const context = import_react.useContext(FieldsetRootContext);
	if (!context && !optional) throw new Error("Base UI: FieldsetRootContext is missing. Fieldset parts must be placed within <Fieldset.Root>.");
	return context;
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useRegisteredLabelId-b7u9ygya03448zzn.js
function useRegisteredLabelId(idProp, setLabelId) {
	const id = useBaseUiId(idProp);
	useIsoLayoutEffect(() => {
		setLabelId(id);
		return () => {
			setLabelId((currentId) => currentId === id ? void 0 : currentId);
		};
	}, [id, setLabelId]);
	return id;
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/LabelableContext-dz4wz3lu3lgqusu7.js
/**
* Present when the field is in a valid state.
*/
var valid = "data-valid";
/**
* Present when the field is in an invalid state.
*/
var invalid = "data-invalid";
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
var DEFAULT_FIELD_ROOT_STATE = {
	disabled: false,
	valid: null,
	touched: false,
	dirty: false,
	filled: false,
	focused: false
};
var fieldValidityMapping = { valid(value) {
	if (value === null) return null;
	if (value) return { [valid]: "" };
	return { [invalid]: "" };
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
	setTouched: NOOP,
	setDirty: NOOP,
	setFilled: NOOP,
	setFocused: NOOP,
	focusOwnerRef: { current: void 0 },
	validationMode: "onSubmit",
	shouldValidateOnChange: () => false,
	state: DEFAULT_FIELD_ROOT_STATE,
	registerFieldControl: NOOP,
	validation: {
		getValidationProps: (_disabled, props = EMPTY_OBJECT) => props,
		inputRef: { current: null },
		registeredInputs: /* @__PURE__ */ new Map(),
		registerInput: NOOP,
		getInputControl: () => null,
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
	resetControlId: NOOP,
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
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/FormContext-jv19engyccpf6xcl.js
var FormContext = /*#__PURE__*/ import_react.createContext({
	elementRef: { current: null },
	formRef: { current: { fields: /* @__PURE__ */ new Map() } },
	errors: {},
	clearErrors: NOOP,
	validationMode: "onSubmit",
	submitCountRef: { current: 0 }
});
FormContext.displayName = "FormContext";
function useFormContext() {
	return import_react.useContext(FormContext);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useLabel-me6zzfvkypo458pi.js
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
		const controlElement = getControlById(event.currentTarget, resolvedControlId);
		if (isHTMLElement(controlElement)) focusElementWithVisible(controlElement);
	}
	function handleInteraction(event) {
		const target = getTarget(event.nativeEvent);
		if (closest(target, "button,input,select,textarea")) return;
		if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
		if (native) return;
		focusControl(event);
	}
	return native ? {
		id,
		htmlFor: resolvedControlId,
		onMouseDown: handleInteraction
	} : {
		id,
		onClick: handleInteraction,
		onPointerDown(event) {
			event.preventDefault();
		}
	};
}
function getControlById(label, id) {
	let root = label.getRootNode();
	while (isShadowRoot(root)) {
		const element = root.getElementById(id);
		if (element) return element;
		root = root.host.getRootNode();
	}
	return ownerDocument(label).getElementById(id);
}
function focusElementWithVisible(element) {
	element.focus({ focusVisible: true });
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useFieldValidation-oe16jiigp971yrzr.js
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
/**
* Whether an input participates in the surrounding Base UI Form. Inputs that are effectively
* disabled, or whose `form` attribute explicitly associates them with another form, are excluded.
* DOM position only matters when it associates the input with a different form. Otherwise, field
* registration is context-driven, so portaled inputs (for example inside a dialog) still belong to
* the form for both validation and values projected into `onFormSubmit`.
*/
function isEligibleInput(input, formElement) {
	if (input.matches(":disabled")) return false;
	if (!formElement || input.form === formElement) return true;
	return input.form === null && !input.hasAttribute("form");
}
/**
* Picks the input whose native validity should represent a field that owns several inputs (such as a
* checkbox or radio group). Prefers the first eligible currently-invalid input, where "first" follows
* registration order (mount order), and otherwise returns the first eligible input.
*/
function findRepresentativeInput(inputs, formElement) {
	let fallback = null;
	for (const input of inputs.keys()) {
		if (!isEligibleInput(input, formElement)) continue;
		if (!input.validity.valid) return input;
		fallback ??= input;
	}
	return fallback;
}
function makeState(customError) {
	return {
		...DEFAULT_VALIDITY_STATE,
		valid: !customError,
		customError
	};
}
function getNativeErrors(element) {
	return element && element.validationMessage ? [element.validationMessage] : [];
}
function useFieldValidation(params) {
	const { elementRef, formRef } = useFormContext();
	const { setValidityData, validate, validityData, validationDebounceTime, invalid, markedDirtyRef, state, shouldValidateOnChange, validationMode, registeredFieldIdRef } = params;
	const { controlId, getDescriptionProps } = useLabelableContext();
	const timeout = useTimeout();
	const inputRef = import_react.useRef(null);
	const registeredInputs = useRefWithInit(() => /* @__PURE__ */ new Map()).current;
	const validationCommitIdRef = import_react.useRef(0);
	const customValidityRef = import_react.useRef(null);
	const registerInput = import_react.useCallback((element, registration) => {
		registeredInputs.set(element, registration);
		return () => {
			registeredInputs.delete(element);
		};
	}, [registeredInputs]);
	const getInputControl = useStableCallback(() => {
		const element = findRepresentativeInput(registeredInputs, elementRef.current);
		return element && registeredInputs.get(element)?.controlRef.current || null;
	});
	const commit = useStableCallback(async (value, revalidate = false) => {
		validationCommitIdRef.current += 1;
		const validationCommitId = validationCommitIdRef.current;
		function updateRegisteredFieldValidity(nextValidityData, externalInvalid = invalid) {
			const fieldId = registeredFieldIdRef.current ?? controlId;
			if (fieldId == null) return;
			const currentFieldData = formRef.current.fields.get(fieldId);
			if (!currentFieldData) return;
			const validityDataWithFormErrors = getCombinedFieldValidityData(nextValidityData, externalInvalid);
			formRef.current.fields.set(fieldId, {
				...currentFieldData,
				validityData: validityDataWithFormErrors
			});
		}
		function makeValidityData(validityState, errorMessages) {
			const errors = validityState.valid === false ? errorMessages : [];
			return {
				value,
				state: validityState,
				error: errors[0] ?? "",
				errors,
				initialValue: validityData.initialValue
			};
		}
		function setCustomValidity(element, message) {
			const displaced = element.validity.customError ? element.validationMessage : "";
			const ownedMessage = message.replace(/\r\n?/g, "\n");
			element.setCustomValidity(ownedMessage);
			customValidityRef.current = [
				element,
				ownedMessage,
				displaced
			];
		}
		function clearCustomValidity() {
			const record = customValidityRef.current;
			customValidityRef.current = null;
			if (record && (!record[0].willValidate || record[0].validationMessage === record[1])) record[0].setCustomValidity(record[2]);
		}
		function publish(validityState, errorMessages, externalInvalid) {
			const nextValidityData = makeValidityData(validityState, errorMessages);
			updateRegisteredFieldValidity(nextValidityData, externalInvalid);
			setValidityData(nextValidityData);
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
		function resolveRepresentativeInput() {
			return registeredInputs.size > 0 ? findRepresentativeInput(registeredInputs, elementRef.current) : inputRef.current;
		}
		let element = resolveRepresentativeInput();
		function refreshState() {
			element = resolveRepresentativeInput();
			return element?.willValidate ? getState(element) : makeState(false);
		}
		if (revalidate) {
			if (state.valid !== false || !element) return;
			if (!element.validity.valueMissing) {
				clearCustomValidity();
				const currentElement = resolveRepresentativeInput();
				const foreign = currentElement?.validity.customError ? getNativeErrors(currentElement) : [];
				publish(makeState(foreign.length > 0), foreign, false);
				return;
			}
			for (const key of validityKeys) if (key !== "valid" && key !== "valueMissing" && key !== "customError" && element.validity[key]) return;
		}
		timeout.clear();
		clearCustomValidity();
		let nextState = refreshState();
		let validationErrors = getNativeErrors(element);
		const isValidatingOnChange = shouldValidateOnChange();
		if (validationErrors.length === 0 || isValidatingOnChange) {
			const formValues = Array.from(formRef.current.fields.values()).reduce((acc, field) => {
				if (field.name) acc[field.name] = field.getValue();
				return acc;
			}, {});
			const resultOrPromise = validate(value, formValues);
			let result;
			if (typeof resultOrPromise === "object" && resultOrPromise !== null && "then" in resultOrPromise) {
				if (nextState.valid === false) publish(nextState, validationErrors);
				else if (validationMode === "onSubmit" || !validityData.state.customError) {
					nextState.valid = null;
					publish(nextState, validationErrors);
				}
				result = await resultOrPromise;
				if (validationCommitId !== validationCommitIdRef.current) return;
				nextState = refreshState();
			} else result = resultOrPromise;
			validationErrors = result ? [].concat(result).filter(Boolean) : [];
			if (validationErrors.length > 0) {
				nextState.valid = false;
				nextState.customError = true;
				if (element?.willValidate) setCustomValidity(element, validationErrors.join("\n"));
			} else validationErrors = getNativeErrors(element);
		}
		publish(nextState, validationErrors);
	});
	const change = useStableCallback((value, cancelPending = false) => {
		timeout.clear();
		validationCommitIdRef.current += 1;
		if (cancelPending) return;
		const validateOnChange = shouldValidateOnChange();
		if (validateOnChange && value !== "" && validationDebounceTime) timeout.start(validationDebounceTime, () => {
			commit(value);
		});
		else commit(value, !validateOnChange);
	});
	const getValidationProps = import_react.useCallback((disabled, externalProps = {}) => mergeProps(getDescriptionProps(externalProps), state.valid === false && !state.disabled && !disabled ? { "aria-invalid": true } : EMPTY_OBJECT), [
		getDescriptionProps,
		state.disabled,
		state.valid
	]);
	return import_react.useMemo(() => ({
		getValidationProps,
		inputRef,
		registeredInputs,
		registerInput,
		getInputControl,
		commit,
		change
	}), [
		getValidationProps,
		registeredInputs,
		registerInput,
		getInputControl,
		commit,
		change
	]);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/error-lbnic2b20qr3mukp.js
var error = createLogOnce("error", "Base UI");
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/FieldItemContext-ohsf45im6xhpay40.js
var FieldItemContext = /*#__PURE__*/ import_react.createContext({ disabled: false });
FieldItemContext.displayName = "FieldItemContext";
function useFieldItemContext() {
	return import_react.useContext(FieldItemContext);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/FieldLabel-fjc7tdis7rcbq8o4.js
var LabelableProvider = function LabelableProvider(props) {
	const defaultId = useBaseUiId();
	const [controlIdState, setControlIdState] = import_react.useState(defaultId);
	const [labelId, setLabelId] = import_react.useState();
	const [messageIds, setMessageIds] = import_react.useState([]);
	const controlId = controlIdState === void 0 ? defaultId : controlIdState;
	const registrationsRef = useRefWithInit(() => /* @__PURE__ */ new Map());
	const { messageIds: parentMessageIds } = useLabelableContext();
	const registerControlId = useStableCallback((source, nextId) => {
		const registrations = registrationsRef.current;
		if (nextId === void 0) registrations.delete(source);
		else registrations.set(source, nextId);
		setControlIdState((prev) => {
			if (registrations.size === 0) return prev;
			let nextControlId;
			for (const id of registrations.values()) {
				if (id === prev) return prev;
				if (nextControlId === void 0) nextControlId = id;
			}
			return nextControlId;
		});
	});
	const resetControlId = useStableCallback(() => {
		if (registrationsRef.current.size === 0) setControlIdState(defaultId);
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
		resetControlId,
		labelId,
		setLabelId,
		messageIds,
		setMessageIds,
		getDescriptionProps
	}), [
		controlId,
		registerControlId,
		resetControlId,
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
function useFieldControlRegistration(params) {
	const { change, commit, invalid, markedDirtyRef, name, setRegisteredFieldName, registeredFieldIdRef, setValidityData, validityData } = params;
	const { formRef } = useFormContext();
	const activeFieldControlSourceRef = import_react.useRef(null);
	const registrationRef = import_react.useRef(null);
	const initialValueCapturedRef = import_react.useRef(false);
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
			controlRef: registration.controlRef,
			validityData: getCombinedFieldValidityData(validityData, invalid),
			validate
		});
	}
	function deleteRegistration(id = registrationRef.current?.id) {
		if (id) formRef.current.fields.delete(id);
	}
	function captureInitialValue(registration) {
		if (initialValueCapturedRef.current) return;
		initialValueCapturedRef.current = true;
		const initialValue = getRegistrationValue(registration);
		setValidityData((prev) => prev.initialValue === initialValue ? prev : {
			...prev,
			initialValue
		});
	}
	useIsoLayoutEffect(() => {
		const registration = registrationRef.current;
		if (!registration || !registration.id) return;
		setRegisteredFieldName(name ? void 0 : registration.name);
		formRef.current.fields.set(registration.id, {
			getValue: getValueForForm,
			name: name ?? registration.name,
			controlRef: registration.controlRef,
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
				change(void 0, true);
				deleteRegistration();
				registrationRef.current = null;
				setRegisteredFieldName(void 0);
				registeredFieldIdRef.current = void 0;
			}
			return;
		}
		const previousId = registrationRef.current?.id;
		const previousSource = activeFieldControlSourceRef.current;
		if (previousSource && previousSource !== source) change(void 0, true);
		activeFieldControlSourceRef.current = source;
		registrationRef.current = registration;
		if (!name) setRegisteredFieldName(registration.name);
		registeredFieldIdRef.current = registration.id;
		if (previousId && previousId !== registration.id) deleteRegistration(previousId);
		captureInitialValue(registration);
		refreshRegistration();
	})];
}
/**
* @internal
*/
var FieldRootInner = /*#__PURE__*/ import_react.forwardRef(function FieldRootInner(componentProps, forwardedRef) {
	const { errors, validationMode: formValidationMode, submitCountRef } = useFormContext();
	const { render, className, validate: validateProp, validationDebounceTime = 0, validationMode = formValidationMode, name, disabled: disabledProp = false, invalid: invalidProp, dirty: dirtyProp, touched: touchedProp, actionsRef, style, ...elementProps } = componentProps;
	const disabledFieldset = useFieldsetRootContext(true)?.disabled;
	const validate = useStableCallback(validateProp || (() => null));
	const disabled = disabledFieldset || disabledProp;
	const [touchedState, setTouchedUnwrapped] = import_react.useState(false);
	const [dirtyState, setDirtyUnwrapped] = import_react.useState(false);
	const [filled, setFilled] = import_react.useState(false);
	const [focused, setFocused] = import_react.useState(false);
	const focusOwnerRef = import_react.useRef(void 0);
	const dirty = dirtyProp ?? dirtyState;
	const touched = touchedProp ?? touchedState;
	const markedDirtyRef = import_react.useRef(dirty);
	const registeredFieldIdRef = import_react.useRef(void 0);
	const [registeredFieldName, setRegisteredFieldName] = import_react.useState();
	const effectiveName = name ?? registeredFieldName;
	useIsoLayoutEffect(() => {
		if (dirtyProp !== void 0) markedDirtyRef.current = dirtyProp;
	}, [dirtyProp]);
	const setDirty = useStableCallback((value) => {
		if (dirtyProp !== void 0) return;
		if (value) markedDirtyRef.current = true;
		setDirtyUnwrapped(value);
	});
	const setTouched = useStableCallback((value) => {
		if (touchedProp !== void 0) return;
		setTouchedUnwrapped(value);
	});
	const shouldValidateOnChange = useStableCallback(() => validationMode === "onChange" || validationMode === "onSubmit" && submitCountRef.current > 0);
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
	const valid = !invalid && (disabled ? null : validityData.state.valid);
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
		validationMode,
		registeredFieldIdRef
	});
	const [validateFieldControl, registerFieldControl] = useFieldControlRegistration({
		change: validation.change,
		commit: validation.commit,
		invalid,
		markedDirtyRef,
		name,
		setRegisteredFieldName,
		registeredFieldIdRef,
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
		setTouched,
		setDirty,
		setFilled,
		setFocused,
		focusOwnerRef,
		validationMode,
		shouldValidateOnChange,
		state,
		registerFieldControl,
		validation
	}), [
		invalid,
		effectiveName,
		validityData,
		disabled,
		setTouched,
		setDirty,
		setFilled,
		setFocused,
		validationMode,
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
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useLabelableId-bjeh6q3pgrqjb7er.js
function useLabelableId(params = {}) {
	const { id, enabled = true } = params;
	const { controlId, registerControlId, resetControlId } = useLabelableContext();
	const defaultId = useBaseUiId();
	const controlSourceRef = useRefWithInit(() => Symbol());
	const hasRegisteredRef = import_react.useRef(false);
	const hadExplicitIdRef = import_react.useRef(false);
	const unregisterControlId = useStableCallback(() => {
		if (!hasRegisteredRef.current || registerControlId === NOOP) return;
		hasRegisteredRef.current = false;
		registerControlId(controlSourceRef.current, void 0);
	});
	useIsoLayoutEffect(() => {
		if (!enabled || registerControlId === NOOP) {
			unregisterControlId();
			return;
		}
		let nextId;
		if (id !== void 0) {
			hadExplicitIdRef.current = true;
			nextId = id;
		} else if (hadExplicitIdRef.current) nextId = defaultId;
		else {
			resetControlId();
			return;
		}
		if (nextId === void 0) {
			unregisterControlId();
			return;
		}
		hasRegisteredRef.current = true;
		registerControlId(controlSourceRef.current, nextId);
	}, [
		id,
		enabled,
		registerControlId,
		resetControlId,
		defaultId,
		controlSourceRef,
		unregisterControlId
	]);
	useIsoLayoutEffect(() => {
		return unregisterControlId;
	}, [unregisterControlId]);
	return (enabled ? controlId : void 0) ?? id ?? defaultId;
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useRegisterFieldControl-m1stc9l9y4cndf0k.js
function useRegisterFieldControl(controlRef, id, value, getFormValueOverride, enabled = true, name) {
	const { registerFieldControl } = useFieldRootContext();
	const sourceRef = useRefWithInit(() => Symbol());
	useIsoLayoutEffect(() => {
		const source = sourceRef.current;
		if (!enabled) {
			registerFieldControl(source, void 0);
			return;
		}
		registerFieldControl(source, {
			controlRef,
			getValue: getFormValueOverride,
			id,
			name,
			value
		});
	}, [
		controlRef,
		enabled,
		getFormValueOverride,
		id,
		name,
		registerFieldControl,
		sourceRef,
		value
	]);
	useIsoLayoutEffect(() => {
		const source = sourceRef.current;
		return () => {
			registerFieldControl(source, void 0);
		};
	}, [registerFieldControl, sourceRef]);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useValueChanged-fjssa2v6d4w8y332.js
function useValueChanged(value, onChange) {
	const valueRef = import_react.useRef(value);
	const onChangeCallback = useStableCallback(onChange);
	useIsoLayoutEffect(() => {
		if (valueRef.current !== value) onChangeCallback(valueRef.current);
		valueRef.current = value;
	}, [value, onChangeCallback]);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useSetFieldFocused-fbvj7gcv67dqfkp0.js
/**
* Returns the field's `setFocused`, recording which control the focused state belongs to.
*
* Disabling or unmounting a focused control moves focus away without firing `blur`, so the focused
* state would otherwise stay latched. A field can have several focus targets, so a control only
* clears the shared state when focus last landed on itself. The stable callback doubles as that
* identity.
*/
function useSetFieldFocused(disabled, focusTargetRef, onFocusedChange) {
	const { setFocused, focusOwnerRef } = useFieldRootContext();
	const setFieldFocused = useStableCallback((focused) => {
		if (focused ? !disabled : focusOwnerRef.current === setFieldFocused) {
			focusOwnerRef.current = focused && setFieldFocused;
			onFocusedChange?.(focused);
			setFocused(focused);
		}
	});
	useIsoLayoutEffect(() => {
		const el = focusTargetRef.current;
		if ((el?.getRootNode())?.activeElement === el) setFieldFocused(true);
		return () => setFieldFocused(false);
	}, [
		disabled,
		focusTargetRef,
		setFieldFocused
	]);
	return setFieldFocused;
}
//#endregion
export { useFieldsetRootContext as _, FieldLabel as a, error as c, useFormContext as d, fieldValidityMapping as f, FieldsetRootContext as g, useRegisteredLabelId as h, useLabelableId as i, isEligibleInput as l, useLabelableContext as m, useValueChanged as n, FieldRoot as o, useFieldRootContext as p, useRegisterFieldControl as r, useFieldItemContext as s, useSetFieldFocused as t, useLabel as u, Label as v, p as y };

//# sourceMappingURL=useSetFieldFocused-fbvj7gcv67dqfkp0-BVPDsXjs.js.map