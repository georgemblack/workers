import { y as __toESM } from "./createServerFn-TpCK4c9B.js";
import { a as require_react, i as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
import { D as useTransitionStatus, P as useTimeout, Wt as transitionStatusMapping, Z as useStableCallback, c as useBaseUiId, fn as useRenderElement, hn as cn, k as useOpenChangeComplete, lt as createChangeEventDetails, mn as resolveVariant, ot as none, tn as useIsoLayoutEffect } from "./button-hzvowfkbathmx8yg-Ddqo88Fb.js";
import { a as FieldLabel, d as useFormContext, f as fieldValidityMapping, i as useLabelableId, m as useLabelableContext, n as useValueChanged, o as FieldRoot, p as useFieldRootContext, r as useRegisterFieldControl, s as useFieldItemContext, t as useSetFieldFocused, v as Label } from "./useSetFieldFocused-fbvj7gcv67dqfkp0-BVPDsXjs.js";
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/FieldDescription-orix2gepowrp5ni4.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var stateAttributesMapping = {
	...fieldValidityMapping,
	...transitionStatusMapping
};
/**
* An error message displayed if the field control fails validation.
* Renders a `<div>` element.
*
* Documentation: [Base UI Field](https://base-ui.com/react/components/field)
*/
var FieldError = /*#__PURE__*/ import_react.forwardRef(function FieldError(componentProps, forwardedRef) {
	const { render, id: idProp, className, match, style, ...elementProps } = componentProps;
	const id = useBaseUiId(idProp);
	const { validityData, state: fieldState, name } = useFieldRootContext(false);
	const { setMessageIds } = useLabelableContext();
	const { errors } = useFormContext();
	const formError = name && Object.hasOwn(errors, name) ? errors[name] : null;
	const hasFormError = !!(Array.isArray(formError) ? formError.length : formError);
	const hasSpecificMatch = typeof match === "string";
	let rendered = false;
	if (match === true) rendered = true;
	else if (fieldState.disabled) rendered = false;
	else if (hasSpecificMatch) rendered = Boolean(validityData.state[match]);
	else rendered = hasFormError || validityData.state.valid === false;
	const { mounted, transitionStatus, setMounted } = useTransitionStatus(rendered);
	useIsoLayoutEffect(() => {
		if (!rendered || !id) return;
		setMessageIds((v) => v.concat(id));
		return () => {
			setMessageIds((v) => v.filter((item) => item !== id));
		};
	}, [
		rendered,
		id,
		setMessageIds
	]);
	const errorRef = import_react.useRef(null);
	const [lastRenderedMessage, setLastRenderedMessage] = import_react.useState(null);
	const [lastRenderedMessageKey, setLastRenderedMessageKey] = import_react.useState(null);
	let error = validityData.error;
	if (!hasSpecificMatch && hasFormError) error = formError;
	else if (validityData.errors.length > 1) error = validityData.errors;
	let errorMessage = error;
	if (Array.isArray(error)) errorMessage = error.length > 1 ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)("ul", { children: error.map((message) => /*#__PURE__*/ (0, import_jsx_runtime.jsx)("li", { children: message }, message)) }) : error[0];
	const errorKey = Array.isArray(error) ? JSON.stringify(error) : error;
	if (rendered && errorKey !== lastRenderedMessageKey) {
		setLastRenderedMessageKey(errorKey);
		setLastRenderedMessage(errorMessage);
	}
	useOpenChangeComplete({
		open: rendered,
		ref: errorRef,
		onComplete() {
			if (!rendered) setMounted(false);
		}
	});
	const state = {
		...fieldState,
		transitionStatus
	};
	const element = useRenderElement("div", componentProps, {
		ref: [forwardedRef, errorRef],
		state,
		props: [{
			id,
			children: rendered ? errorMessage : lastRenderedMessage
		}, elementProps],
		stateAttributesMapping,
		enabled: mounted
	});
	if (!mounted) return null;
	return element;
});
FieldError.displayName = "FieldError";
/**
* A paragraph with additional information about the field.
* Renders a `<p>` element.
*
* Documentation: [Base UI Field](https://base-ui.com/react/components/field)
*/
var FieldDescription = /*#__PURE__*/ import_react.forwardRef(function FieldDescription(componentProps, forwardedRef) {
	const { render, id: idProp, className, style, ...elementProps } = componentProps;
	const id = useBaseUiId(idProp);
	const fieldRootContext = useFieldRootContext(false);
	const fieldItemContext = useFieldItemContext();
	const { setMessageIds } = useLabelableContext();
	const state = {
		...fieldRootContext.state,
		disabled: fieldRootContext.disabled || fieldItemContext.disabled
	};
	useIsoLayoutEffect(() => {
		if (!id) return;
		setMessageIds((v) => v.concat(id));
		return () => {
			setMessageIds((v) => v.filter((item) => item !== id));
		};
	}, [id, setMessageIds]);
	return useRenderElement("p", componentProps, {
		ref: forwardedRef,
		state,
		props: [{ id }, elementProps],
		stateAttributesMapping: fieldValidityMapping
	});
});
FieldDescription.displayName = "FieldDescription";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/field-fowmq5smvp17pnqe.js
/**
* Normalizes an error prop that may be a string or structured object
* into the `{ message, match }` shape expected by `<Field>`.
*
* Returns `undefined` when the input is falsy.
*/
function normalizeFieldError(error) {
	if (!error) return void 0;
	if (typeof error === "string") return {
		message: error,
		match: true
	};
	return error;
}
function fieldVariants({ controlFirst = false } = {}) {
	return cn("grid gap-2", "has-[input[type=checkbox]]:grid-cols-[auto_1fr] has-[input[type=checkbox]]:items-center", "has-[[role=switch]]:grid-cols-[auto_1fr] has-[[role=switch]]:items-center", controlFirst && [
		"has-[input[type=checkbox]]:flex has-[input[type=checkbox]]:flex-row-reverse has-[input[type=checkbox]]:flex-wrap has-[input[type=checkbox]]:items-center",
		"has-[[role=switch]]:flex has-[[role=switch]]:flex-row-reverse has-[[role=switch]]:flex-wrap has-[[role=switch]]:items-center",
		"[&>label]:flex-1"
	]);
}
/** Values React renders as nothing. */
function rendersNothing(node) {
	return node == null || typeof node === "boolean" || node === "";
}
/**
* Form field wrapper that provides a label, optional description, and error display
* around any form control. Built on Base UI Field primitives.
*
* @example
* ```tsx
* <Field label="Username">
*   <Input placeholder="Choose a username" />
* </Field>
* ```
*/
function Field({ children, label, required, labelTooltip, error, description, controlFirst = false, hideLabel = false }) {
	const showOptional = required === false;
	const hasLabelContent = !rendersNothing(label) || showOptional || !rendersNothing(labelTooltip);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldRoot, {
		className: fieldVariants({ controlFirst }),
		children: [
			!hideLabel && hasLabelContent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
				className: "m-0 text-base font-medium text-kumo-default select-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					showOptional,
					tooltip: labelTooltip,
					asContent: true,
					children: label
				})
			}),
			children,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
				className: cn("text-sm leading-snug text-kumo-danger", "col-span-full"),
				match: error.match,
				children: error.message
			}) : description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, {
				className: cn("text-sm leading-snug text-kumo-subtle", "col-span-full"),
				children: description
			})
		]
	});
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/FieldControl-hjj2tcqruozadgdi.js
/**
* The form control to label and validate.
* Renders an `<input>` element.
*
* You can omit this part and use any Base UI input component instead. For example,
* [Input](https://base-ui.com/react/components/input), [Checkbox](https://base-ui.com/react/components/checkbox),
* or [Select](https://base-ui.com/react/components/select), among others, will work with Field out of the box.
*
* Documentation: [Base UI Field](https://base-ui.com/react/components/field)
*/
var FieldControl = /*#__PURE__*/ import_react.forwardRef(function FieldControl(componentProps, forwardedRef) {
	const { render, className, id: idProp, name: nameProp, value, disabled: disabledProp = false, onValueChange, defaultValue, autoFocus = false, style, ...elementProps } = componentProps;
	const { state: fieldState, name: fieldName, disabled: fieldDisabled, setTouched, setDirty, validityData, setFilled, validationMode, validation } = useFieldRootContext();
	const { clearErrors, elementRef: formElementRef, submitCountRef } = useFormContext();
	const disabled = fieldDisabled || disabledProp;
	const name = fieldName ?? nameProp;
	const state = {
		...fieldState,
		disabled
	};
	const { labelId } = useLabelableContext();
	const id = useLabelableId({ id: idProp });
	const isControlled = value !== void 0;
	const serializedValue = value == null ? void 0 : String(value);
	const getValueFromInput = useStableCallback(() => validation.inputRef.current?.value);
	useRegisterFieldControl(validation.inputRef, id, serializedValue, getValueFromInput, !disabled, nameProp);
	useIsoLayoutEffect(() => {
		const currentValue = serializedValue ?? validation.inputRef.current?.value;
		if (currentValue !== void 0) setFilled(currentValue !== "");
	}, [
		serializedValue,
		defaultValue,
		validation.inputRef,
		setFilled
	]);
	useValueChanged(serializedValue, () => {
		if (serializedValue === void 0) return;
		clearErrors(name);
		setDirty(serializedValue !== (validityData.initialValue ?? ""));
		validation.change(serializedValue);
	});
	const inputRef = import_react.useRef(null);
	const setFocused = useSetFieldFocused(disabled, inputRef);
	const enterValidationTimeout = useTimeout();
	return useRenderElement("input", componentProps, {
		ref: [forwardedRef, inputRef],
		state,
		props: [
			{
				id,
				disabled,
				name,
				ref: validation.inputRef,
				"aria-labelledby": labelId,
				autoFocus,
				...isControlled ? { value } : { defaultValue },
				onChange(event) {
					const inputValue = event.currentTarget.value;
					const details = createChangeEventDetails(none, event.nativeEvent);
					onValueChange?.(inputValue, details);
					if (isControlled) return;
					setDirty(inputValue !== (validityData.initialValue ?? ""));
					setFilled(inputValue !== "");
					if (!event.nativeEvent.defaultPrevented && !details.isCanceled) {
						clearErrors(name);
						validation.change(inputValue);
					}
				},
				onFocus() {
					setFocused(true);
				},
				onBlur(event) {
					setTouched(true);
					setFocused(false);
					if (validationMode === "onBlur") {
						const inputValue = event.currentTarget.value;
						validation.commit(inputValue);
						if (isControlled) queueMicrotask(() => {
							const nextValue = validation.inputRef.current?.value;
							if (nextValue !== void 0 && nextValue !== inputValue && nextValue !== (validityData.initialValue ?? "")) validation.commit(nextValue);
						});
					}
				},
				onKeyDown(event) {
					if (event.currentTarget.tagName === "INPUT" && event.key === "Enter") {
						setTouched(true);
						const value = event.currentTarget.value;
						const form = event.currentTarget.form;
						if (form && form === formElementRef.current && !event.defaultPrevented) {
							const input = event.currentTarget;
							const submitCount = submitCountRef.current;
							enterValidationTimeout.start(0, () => {
								if (submitCountRef.current === submitCount) validation.commit(input.value);
							});
						} else validation.commit(value);
					}
				}
			},
			elementProps,
			(props) => validation.getValidationProps(disabled, props)
		],
		stateAttributesMapping: fieldValidityMapping
	});
});
FieldControl.displayName = "FieldControl";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/Input-ozudotydd679ly63.js
/**
* A native input element that automatically works with [Field](https://base-ui.com/react/components/field).
* Renders an `<input>` element.
*
* Documentation: [Base UI Input](https://base-ui.com/react/components/input)
*/
var Input$1 = /*#__PURE__*/ import_react.forwardRef(function Input(props, forwardedRef) {
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldControl, {
		ref: forwardedRef,
		...props
	});
});
Input$1.displayName = "Input";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/input-kfi46426y22ocoo4.js
/** Input size and variant definitions mapping names to their Tailwind classes. */
var KUMO_INPUT_VARIANTS = {
	size: {
		xs: {
			classes: "h-5 gap-1 rounded-sm px-1.5 text-xs",
			description: "Extra small input for compact UIs"
		},
		sm: {
			classes: "h-6.5 gap-1 rounded-md px-2 text-xs",
			description: "Small input for secondary fields"
		},
		base: {
			classes: "h-9 gap-1.5 rounded-lg px-3 text-base",
			description: "Default input size"
		},
		lg: {
			classes: "h-10 gap-2 rounded-lg px-4 text-base",
			description: "Large input for prominent fields"
		}
	},
	variant: {
		default: {
			classes: "focus:ring-kumo-focus/50 focus:ring-[1.5px]",
			description: "Default input appearance"
		},
		error: {
			classes: "!ring-kumo-danger focus:ring-kumo-danger/50 focus:ring-[1.5px]",
			description: "Error state for validation failures"
		}
	}
};
var KUMO_INPUT_DEFAULT_VARIANTS = {
	size: "base",
	variant: "default"
};
function inputVariants({ variant = KUMO_INPUT_DEFAULT_VARIANTS.variant, size = KUMO_INPUT_DEFAULT_VARIANTS.size, parentFocusIndicator = false, focusIndicator = false } = {}) {
	return cn("border-0 bg-kumo-control text-kumo-default ring ring-kumo-line outline-none focus:outline-hidden", "kumo-input-placeholder disabled:text-kumo-inactive", resolveVariant(KUMO_INPUT_VARIANTS.size, size, KUMO_INPUT_DEFAULT_VARIANTS.size).classes, resolveVariant(KUMO_INPUT_VARIANTS.variant, variant, KUMO_INPUT_DEFAULT_VARIANTS.variant).classes, parentFocusIndicator && "has-focus-visible:outline-hidden", parentFocusIndicator && (variant === "error" ? "focus-within:ring-[1.5px] focus-within:ring-kumo-danger/50" : "focus-within:ring-[1.5px] focus-within:ring-kumo-focus/50"), focusIndicator && (variant === "error" ? "focus:ring-[1.5px] focus:ring-kumo-danger/50" : "focus:ring-[1.5px] focus:ring-kumo-focus/50"));
}
var Input = (0, import_react.forwardRef)((props, ref) => {
	const { className, size = "base", variant: variantProp, label, labelTooltip, description, error, passwordManagerIgnore = false, ...inputProps } = props;
	if (variantProp === "error") console.warn("[Kumo Input]: variant=\"error\" is deprecated. Error styling is now automatically applied when the `error` prop is truthy. Simply remove the variant prop and pass an error message instead.");
	const variant = variantProp ?? (error ? "error" : "default");
	const { required } = inputProps;
	{
		const hasLabel = Boolean(label);
		const hasAriaLabel = Boolean(inputProps["aria-label"]);
		const hasAriaLabelledBy = Boolean(inputProps["aria-labelledby"]);
		if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) console.warn("[Kumo Input]: Input must have an accessible name. Provide either:\n  - label prop: <Input label='Email' />\n  - aria-label: <Input aria-label='Email address' />\n  - aria-labelledby for custom label association");
	}
	const input = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
		ref,
		className: cn(inputVariants({
			size,
			variant,
			focusIndicator: true
		}), passwordManagerIgnore && "keeper-ignore", className),
		...passwordManagerIgnore ? {
			"data-1p-ignore": "true",
			"data-bwignore": "true",
			"data-form-type": "other",
			"data-lpignore": "true"
		} : {},
		...inputProps
	});
	if (label || error || description) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label,
		required,
		labelTooltip,
		description,
		error: normalizeFieldError(error),
		children: input
	});
	return input;
});
Input.displayName = "Input";
//#endregion
export { Field as a, FieldControl as i, KUMO_INPUT_VARIANTS as n, normalizeFieldError as o, inputVariants as r, Input as t };

//# sourceMappingURL=input-kfi46426y22ocoo4-Ku3HvCJw.js.map