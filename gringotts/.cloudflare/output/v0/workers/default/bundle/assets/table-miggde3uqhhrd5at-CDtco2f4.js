import { y as __toESM } from "./createServerFn-TpCK4c9B.js";
import { a as require_react, i as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
import { $ as visuallyHiddenInput, C as useTransitionStatus, K as transitionStatusMapping, Q as visuallyHidden, Qt as useIsoLayoutEffect, Wt as getWindow, an as mergeProps, at as createChangeEventDetails, cn as useRenderElement, en as EMPTY_ARRAY, et as useStableCallback, i as useBaseUiId, ln as resolveVariant, nn as NOOP, on as useMergedRefs, q as useOpenChangeComplete, sn as useRefWithInit, tn as EMPTY_OBJECT, un as cn, ut as none } from "./button-h36q7tklakhd38nx-D4x2gb7U.js";
import { i as o, n as useValueChanged, r as useButton, t as areArraysEqual } from "./areArraysEqual-nlbeaqlzf4274zr3-C5oJLtyt.js";
import { a as useFieldItemContext, c as useFormContext, d as useLabelableContext, f as FieldsetRootContext, h as p, i as FieldRoot, l as fieldValidityMapping, m as Label, n as useControlled, p as useFieldsetRootContext, r as FieldLabel, t as useRegisterFieldControl, u as useFieldRootContext } from "./useRegisterFieldControl-m1rxsuvtpau2341n-Bd-_oGTD.js";
//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@phosphor-icons/react/dist/defs/Minus.es.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var a = /* @__PURE__ */ new Map([
	["bold", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z" }))],
	["duotone", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", {
		d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
		opacity: "0.2"
	}), /* @__PURE__ */ import_react.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z" }))],
	["fill", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H72a8,8,0,0,1,0-16H184a8,8,0,0,1,0,16Z" }))],
	["light", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M222,128a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,128Z" }))],
	["regular", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z" }))],
	["thin", /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("path", { d: "M220,128a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,128Z" }))]
]);
//#endregion
//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/@phosphor-icons/react/dist/csr/Minus.es.js
var e = import_react.forwardRef((r, s) => /* @__PURE__ */ import_react.createElement(p, {
	ref: s,
	...r,
	weights: a
}));
e.displayName = "MinusIcon";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/FieldsetLegend-j5piwq1giyhrr8s4.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Groups a shared legend with related controls.
* Renders a `<fieldset>` element.
*
* Documentation: [Base UI Fieldset](https://base-ui.com/react/components/fieldset)
*/
var FieldsetRoot = /*#__PURE__*/ import_react.forwardRef(function FieldsetRoot(componentProps, forwardedRef) {
	const { render, className, style, disabled: disabledProp = false, ...elementProps } = componentProps;
	const [legendId, setLegendId] = import_react.useState(void 0);
	const disabled = useFieldsetRootContext(true)?.disabled || disabledProp;
	const element = useRenderElement("fieldset", componentProps, {
		ref: forwardedRef,
		state: { disabled },
		props: [{
			"aria-labelledby": legendId,
			disabled
		}, elementProps]
	});
	const contextValue = import_react.useMemo(() => ({
		legendId,
		setLegendId,
		disabled
	}), [
		legendId,
		setLegendId,
		disabled
	]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldsetRootContext.Provider, {
		value: contextValue,
		children: element
	});
});
FieldsetRoot.displayName = "FieldsetRoot";
/**
* An accessible label that is automatically associated with the fieldset.
* Renders a `<div>` element.
*
* Documentation: [Base UI Fieldset](https://base-ui.com/react/components/fieldset)
*/
var FieldsetLegend = /*#__PURE__*/ import_react.forwardRef(function FieldsetLegend(componentProps, forwardedRef) {
	const { render, className, style, id: idProp, ...elementProps } = componentProps;
	const { disabled, setLegendId } = useFieldsetRootContext();
	const id = useBaseUiId(idProp);
	useIsoLayoutEffect(() => {
		setLegendId(id);
		return () => {
			setLegendId(void 0);
		};
	}, [setLegendId, id]);
	return useRenderElement("div", componentProps, {
		state: { disabled: disabled ?? false },
		ref: forwardedRef,
		props: [{ id }, elementProps]
	});
});
FieldsetLegend.displayName = "FieldsetLegend";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/useAriaLabelledBy-bvw56m1d7czf0w3f.js
/**
* @internal
*/
function useAriaLabelledBy(explicitAriaLabelledBy, labelId, labelSourceRef, enableFallback = true, labelSourceId) {
	const [fallbackAriaLabelledBy, setFallbackAriaLabelledBy] = import_react.useState();
	const generatedLabelId = useBaseUiId(labelSourceId ? `${labelSourceId}-label` : void 0);
	const ariaLabelledBy = explicitAriaLabelledBy ?? labelId ?? fallbackAriaLabelledBy;
	useIsoLayoutEffect(() => {
		const nextAriaLabelledBy = explicitAriaLabelledBy || labelId || !enableFallback ? void 0 : getAriaLabelledBy(labelSourceRef.current, generatedLabelId);
		if (fallbackAriaLabelledBy !== nextAriaLabelledBy) setFallbackAriaLabelledBy(nextAriaLabelledBy);
	});
	return ariaLabelledBy;
}
function getAriaLabelledBy(labelSource, generatedLabelId) {
	const label = findAssociatedLabel(labelSource);
	if (!label) return;
	if (!label.id && generatedLabelId) label.id = generatedLabelId;
	return label.id || void 0;
}
function findAssociatedLabel(labelSource) {
	if (!labelSource) return;
	const parent = labelSource.parentElement;
	if (parent && parent.tagName === "LABEL") return parent;
	const controlId = labelSource.id;
	if (controlId) {
		const nextSibling = labelSource.nextElementSibling;
		if (nextSibling && nextSibling.htmlFor === controlId) return nextSibling;
	}
	const labels = labelSource.labels;
	return labels && labels[0];
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/CheckboxGroupContext-f9wox07n2u5moq4h.js
var CheckboxGroupContext$1 = /*#__PURE__*/ import_react.createContext(void 0);
CheckboxGroupContext$1.displayName = "CheckboxGroupContext";
function useCheckboxGroupContext(optional = true) {
	const context = import_react.useContext(CheckboxGroupContext$1);
	if (context === void 0 && !optional) throw new Error("Base UI: CheckboxGroupContext is missing. CheckboxGroup parts must be placed within <CheckboxGroup>.");
	return context;
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/CheckboxRoot-o5bfpje6e4p6pdgm.js
/**
* Returns the default button a browser uses for implicit form submission.
*
* This is useful for custom form controls that need to mirror native Enter key behavior.
* Clicking the returned submitter preserves browser semantics such as the submitter's click
* event, `SubmitEvent.submitter`, and submitter-specific attributes.
*
* The function follows the controls exposed by `form.elements`, which includes controls associated
* through the `form` attribute. Disabled submitters can be returned because the default button is
* determined before disabled state is considered; clicking a disabled submitter is a no-op.
*/
function getDefaultFormSubmitter(form) {
	if (!form) return null;
	for (const candidate of form.elements) {
		const tagName = candidate.tagName;
		if (tagName === "BUTTON" || tagName === "INPUT") {
			const button = candidate;
			if (button.type === "submit") return button;
		}
	}
	return null;
}
var CheckboxRootDataAttributes = /*#__PURE__*/ function(CheckboxRootDataAttributes) {
	/**
	* Present when the checkbox is checked.
	*/
	CheckboxRootDataAttributes["checked"] = "data-checked";
	/**
	* Present when the checkbox is not checked.
	*/
	CheckboxRootDataAttributes["unchecked"] = "data-unchecked";
	/**
	* Present when the checkbox is in an indeterminate state.
	*/
	CheckboxRootDataAttributes["indeterminate"] = "data-indeterminate";
	/**
	* Present when the checkbox is disabled.
	*/
	CheckboxRootDataAttributes["disabled"] = "data-disabled";
	/**
	* Present when the checkbox is readonly.
	*/
	CheckboxRootDataAttributes["readonly"] = "data-readonly";
	/**
	* Present when the checkbox is required.
	*/
	CheckboxRootDataAttributes["required"] = "data-required";
	/**
	* Present when the checkbox is in a valid state (when wrapped in Field.Root).
	*/
	CheckboxRootDataAttributes["valid"] = "data-valid";
	/**
	* Present when the checkbox is in an invalid state (when wrapped in Field.Root).
	*/
	CheckboxRootDataAttributes["invalid"] = "data-invalid";
	/**
	* Present when the checkbox has been touched (when wrapped in Field.Root).
	*/
	CheckboxRootDataAttributes["touched"] = "data-touched";
	/**
	* Present when the checkbox's value has changed (when wrapped in Field.Root).
	*/
	CheckboxRootDataAttributes["dirty"] = "data-dirty";
	/**
	* Present when the checkbox is checked (when wrapped in Field.Root).
	*/
	CheckboxRootDataAttributes["filled"] = "data-filled";
	/**
	* Present when the checkbox is focused (when wrapped in Field.Root).
	*/
	CheckboxRootDataAttributes["focused"] = "data-focused";
	return CheckboxRootDataAttributes;
}({});
function useStateAttributesMapping(state) {
	return import_react.useMemo(() => ({
		checked(value) {
			if (state.indeterminate) return {};
			if (value) return { [CheckboxRootDataAttributes.checked]: "" };
			return { [CheckboxRootDataAttributes.unchecked]: "" };
		},
		...fieldValidityMapping
	}), [state.indeterminate]);
}
var CheckboxRootContext = /*#__PURE__*/ import_react.createContext(void 0);
CheckboxRootContext.displayName = "CheckboxRootContext";
function useCheckboxRootContext() {
	const context = import_react.useContext(CheckboxRootContext);
	if (context === void 0) throw new Error("Base UI: CheckboxRootContext is missing. Checkbox parts must be placed within <Checkbox.Root>.");
	return context;
}
var PARENT_CHECKBOX = "data-parent";
/**
* Represents the checkbox itself.
* Renders a `<span>` element and a hidden `<input>` beside.
*
* Documentation: [Base UI Checkbox](https://base-ui.com/react/components/checkbox)
*/
var CheckboxRoot = /*#__PURE__*/ import_react.forwardRef(function CheckboxRoot(componentProps, forwardedRef) {
	const { checked: checkedProp, className, defaultChecked = false, "aria-labelledby": ariaLabelledByProp, disabled: disabledProp = false, form, id: idProp, indeterminate = false, inputRef: inputRefProp, name: nameProp, onCheckedChange, parent = false, readOnly = false, render, required = false, uncheckedValue, value: valueProp, nativeButton = false, style, ...elementProps } = componentProps;
	const { clearErrors } = useFormContext();
	const { disabled: rootDisabled, name: fieldName, setDirty, setFilled, setFocused, setTouched, state: fieldState, validationMode, validityData, validation: localValidation } = useFieldRootContext();
	const fieldItemContext = useFieldItemContext();
	const { labelId, controlId, registerControlId, getDescriptionProps } = useLabelableContext();
	const groupContext = useCheckboxGroupContext();
	const parentContext = groupContext?.parent;
	const isGroupedWithParent = parentContext && groupContext.allValues;
	const disabled = rootDisabled || fieldItemContext.disabled || groupContext?.disabled || disabledProp;
	const name = fieldName ?? nameProp;
	const value = valueProp ?? name;
	const id = useBaseUiId();
	const parentId = useBaseUiId();
	let inputId = controlId;
	if (isGroupedWithParent) inputId = parent ? parentId : `${parentContext.id}-${value}`;
	else if (idProp) inputId = idProp;
	let groupProps = {};
	if (isGroupedWithParent) {
		if (parent) groupProps = groupContext.parent.getParentProps();
		else if (value) groupProps = groupContext.parent.getChildProps(value);
	}
	const { checked: groupChecked = checkedProp, indeterminate: groupIndeterminate = indeterminate, onCheckedChange: groupOnChange, ...otherGroupProps } = groupProps;
	const groupValue = groupContext?.value;
	const setGroupValue = groupContext?.setValue;
	const defaultGroupValue = groupContext?.defaultValue;
	const controlRef = import_react.useRef(null);
	const controlSourceRef = useRefWithInit(() => Symbol("checkbox-control"));
	const hasRegisteredRef = import_react.useRef(false);
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton
	});
	const validation = groupContext?.validation ?? localValidation;
	const [checked, setCheckedState] = useControlled({
		controlled: value && groupValue && !parent ? groupValue.includes(value) : groupChecked,
		default: value && defaultGroupValue && !parent ? defaultGroupValue.includes(value) : defaultChecked,
		name: "Checkbox",
		state: "checked"
	});
	const computedChecked = isGroupedWithParent ? Boolean(groupChecked) : checked;
	const computedIndeterminate = isGroupedWithParent ? groupIndeterminate || indeterminate : indeterminate;
	useIsoLayoutEffect(() => {
		if (registerControlId === NOOP) return;
		hasRegisteredRef.current = true;
		registerControlId(controlSourceRef.current, inputId);
	}, [
		inputId,
		registerControlId,
		controlSourceRef
	]);
	import_react.useEffect(() => {
		const controlSource = controlSourceRef.current;
		return () => {
			if (!hasRegisteredRef.current || registerControlId === NOOP) return;
			hasRegisteredRef.current = false;
			registerControlId(controlSource, void 0);
		};
	}, [registerControlId, controlSourceRef]);
	useRegisterFieldControl(controlRef, id, checked, void 0, !groupContext && !disabled, nameProp);
	const inputRef = import_react.useRef(null);
	const mergedInputRef = useMergedRefs(inputRefProp, inputRef, validation.inputRef, validation.registerInput);
	const ariaLabelledBy = useAriaLabelledBy(ariaLabelledByProp, labelId, inputRef, !nativeButton, inputId ?? void 0);
	useIsoLayoutEffect(() => {
		if (inputRef.current) {
			inputRef.current.indeterminate = computedIndeterminate;
			if (checked) setFilled(true);
		}
	}, [
		checked,
		computedIndeterminate,
		setFilled
	]);
	useValueChanged(checked, () => {
		if (groupContext) return;
		clearErrors(name);
		setFilled(checked);
		setDirty(checked !== validityData.initialValue);
		validation.change(checked);
	});
	const inputProps = mergeProps({
		checked,
		disabled,
		form,
		name: parent ? void 0 : name,
		id: nativeButton ? void 0 : inputId ?? void 0,
		required,
		ref: mergedInputRef,
		style: name ? visuallyHiddenInput : visuallyHidden,
		tabIndex: -1,
		type: "checkbox",
		"aria-hidden": true,
		onChange(event) {
			if (event.nativeEvent.defaultPrevented) return;
			if (readOnly) {
				event.preventDefault();
				return;
			}
			const nextChecked = event.currentTarget.checked;
			const details = createChangeEventDetails(none, event.nativeEvent);
			onCheckedChange?.(nextChecked, details);
			if (details.isCanceled) return;
			groupOnChange?.(nextChecked, details);
			if (details.isCanceled) return;
			setCheckedState(nextChecked);
			if (value && groupValue && setGroupValue && !parent && !isGroupedWithParent) {
				const nextGroupValue = nextChecked ? [...groupValue, value] : groupValue.filter((item) => item !== value);
				setGroupValue(nextGroupValue, details);
			}
		},
		onFocus() {
			controlRef.current?.focus();
		}
	}, valueProp !== void 0 ? { value: (groupContext ? checked && valueProp : valueProp) || "" } : EMPTY_OBJECT, getDescriptionProps, (props) => validation.getValidationProps(disabled, props));
	import_react.useEffect(() => {
		if (!parentContext || !value) return;
		const disabledStates = parentContext.disabledStatesRef.current;
		disabledStates.set(value, disabled);
		return () => {
			disabledStates.delete(value);
		};
	}, [
		parentContext,
		disabled,
		value
	]);
	const state = import_react.useMemo(() => ({
		...fieldState,
		checked: computedChecked,
		disabled,
		readOnly,
		required,
		indeterminate: computedIndeterminate
	}), [
		fieldState,
		computedChecked,
		disabled,
		readOnly,
		required,
		computedIndeterminate
	]);
	const stateAttributesMapping = useStateAttributesMapping(state);
	const element = useRenderElement("span", componentProps, {
		state,
		ref: [
			buttonRef,
			controlRef,
			forwardedRef,
			groupContext?.registerControlRef
		],
		props: [
			{
				id: nativeButton ? inputId ?? void 0 : id,
				role: "checkbox",
				"aria-checked": computedIndeterminate ? "mixed" : computedChecked,
				"aria-readonly": readOnly || void 0,
				"aria-required": required || void 0,
				"aria-labelledby": ariaLabelledBy,
				[PARENT_CHECKBOX]: parent ? "" : void 0,
				onFocus() {
					if (!disabled) setFocused(true);
				},
				onBlur() {
					const inputEl = inputRef.current;
					if (!inputEl) return;
					setTouched(true);
					setFocused(false);
					if (validationMode === "onBlur") validation.commit(groupContext ? groupValue : inputEl.checked);
				},
				onKeyDown(event) {
					if (event.key !== "Enter") return;
					event.preventBaseUIHandler();
					if (event.defaultPrevented) return;
					const formToSubmit = inputRef.current?.form ?? null;
					const currentTarget = event.currentTarget;
					const nativeEvent = event.nativeEvent;
					const originalPreventDefault = event.preventDefault;
					const originalNativePreventDefault = nativeEvent.preventDefault;
					let preventDefaultCalledAfterPropagation = false;
					event.preventDefault = () => {
						preventDefaultCalledAfterPropagation = true;
						originalPreventDefault.call(event);
					};
					nativeEvent.preventDefault = () => {
						preventDefaultCalledAfterPropagation = true;
						originalNativePreventDefault.call(nativeEvent);
					};
					originalNativePreventDefault.call(nativeEvent);
					getWindow(currentTarget).queueMicrotask(() => {
						event.preventDefault = originalPreventDefault;
						nativeEvent.preventDefault = originalNativePreventDefault;
						if (!preventDefaultCalledAfterPropagation) getDefaultFormSubmitter(formToSubmit)?.click();
					});
				},
				onClick(event) {
					if (readOnly || disabled) return;
					event.preventDefault();
					const input = inputRef.current;
					if (!input) return;
					input.dispatchEvent(new (getWindow(input)).PointerEvent("click", {
						bubbles: true,
						shiftKey: event.shiftKey,
						ctrlKey: event.ctrlKey,
						altKey: event.altKey,
						metaKey: event.metaKey
					}));
				}
			},
			elementProps,
			otherGroupProps,
			getButtonProps,
			getDescriptionProps,
			(props) => validation.getValidationProps(disabled, props)
		],
		stateAttributesMapping
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(CheckboxRootContext.Provider, {
		value: state,
		children: [
			element,
			!checked && !groupContext && name && !parent && uncheckedValue !== void 0 && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("input", {
				type: "hidden",
				form,
				name,
				value: uncheckedValue,
				disabled
			}),
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)("input", {
				...inputProps,
				suppressHydrationWarning: true
			})
		]
	});
});
CheckboxRoot.displayName = "CheckboxRoot";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/CheckboxGroup-g5xn5gnq8ocqyoum.js
var EMPTY = [];
function useCheckboxGroupParent(params) {
	const { allValues = EMPTY, value = EMPTY, onValueChange: onValueChangeProp } = params;
	const uncontrolledStateRef = import_react.useRef(value);
	const disabledStatesRef = import_react.useRef(/* @__PURE__ */ new Map());
	const [status, setStatus] = import_react.useState("mixed");
	const id = useBaseUiId();
	const checked = value.length === allValues.length;
	const indeterminate = value.length !== allValues.length && value.length > 0;
	const onValueChange = useStableCallback(onValueChangeProp);
	const getParentProps = import_react.useCallback(() => ({
		id,
		indeterminate,
		checked,
		"aria-controls": allValues.map((v) => `${id}-${v}`).join(" "),
		onCheckedChange(_, eventDetails) {
			const uncontrolledState = uncontrolledStateRef.current;
			const none = allValues.filter((v) => disabledStatesRef.current.get(v) && uncontrolledState.includes(v));
			const all = allValues.filter((v) => !disabledStatesRef.current.get(v) || disabledStatesRef.current.get(v) && uncontrolledState.includes(v));
			if (uncontrolledState.length === all.length || uncontrolledState.length === 0) {
				if (value.length === all.length) onValueChange(none, eventDetails);
				else onValueChange(all, eventDetails);
				return;
			}
			let nextStatus = "mixed";
			let nextValue = uncontrolledState;
			if (status === "mixed") {
				nextStatus = "on";
				nextValue = all;
			} else if (status === "on") {
				nextStatus = "off";
				nextValue = none;
			}
			onValueChange(nextValue, eventDetails);
			if (!eventDetails.isCanceled) setStatus(nextStatus);
		}
	}), [
		allValues,
		checked,
		id,
		indeterminate,
		onValueChange,
		status,
		value.length
	]);
	const getChildProps = import_react.useCallback((childValue) => ({
		checked: value.includes(childValue),
		onCheckedChange(nextChecked, eventDetails) {
			const newValue = value.slice();
			if (nextChecked) newValue.push(childValue);
			else newValue.splice(newValue.indexOf(childValue), 1);
			onValueChange(newValue, eventDetails);
			if (!eventDetails.isCanceled) {
				uncontrolledStateRef.current = newValue;
				setStatus("mixed");
			}
		}
	}), [onValueChange, value]);
	return import_react.useMemo(() => ({
		id,
		indeterminate,
		getParentProps,
		getChildProps,
		disabledStatesRef
	}), [
		id,
		indeterminate,
		getParentProps,
		getChildProps
	]);
}
/**
* Provides a shared state to a series of checkboxes.
*
* Documentation: [Base UI Checkbox Group](https://base-ui.com/react/components/checkbox-group)
*/
var CheckboxGroup$1 = /*#__PURE__*/ import_react.forwardRef(function CheckboxGroup(componentProps, forwardedRef) {
	const { allValues, className, defaultValue: defaultValueProp, disabled: disabledProp = false, id: idProp, onValueChange, render, value: externalValue, style, ...elementProps } = componentProps;
	const { disabled: fieldDisabled, name: fieldName, state: fieldState, validation, setFilled, setDirty, validityData } = useFieldRootContext();
	const { labelId, getDescriptionProps } = useLabelableContext();
	const { clearErrors } = useFormContext();
	const disabled = fieldDisabled || disabledProp;
	const defaultValue = import_react.useMemo(() => {
		if (externalValue === void 0) return defaultValueProp ?? [];
	}, [externalValue, defaultValueProp]);
	const [value, setValueUnwrapped] = useControlled({
		controlled: externalValue,
		default: defaultValue,
		name: "CheckboxGroup",
		state: "value"
	});
	const setValue = useStableCallback((v, eventDetails) => {
		onValueChange?.(v, eventDetails);
		if (eventDetails.isCanceled) return;
		setValueUnwrapped(v);
	});
	const parent = useCheckboxGroupParent({
		allValues,
		value,
		onValueChange: setValue
	});
	const id = useBaseUiId(idProp);
	const controlRef = import_react.useRef(null);
	const registerControlRef = import_react.useCallback((element) => {
		if (controlRef.current == null && element != null && !element.hasAttribute("data-parent")) controlRef.current = element;
	}, []);
	useRegisterFieldControl(controlRef, id, value, void 0, !!fieldName && !disabled, fieldName);
	const resolvedValue = value ?? EMPTY_ARRAY;
	useValueChanged(resolvedValue, () => {
		if (fieldName) clearErrors(fieldName);
		const initialValue = Array.isArray(validityData.initialValue) ? validityData.initialValue : EMPTY_ARRAY;
		setFilled(resolvedValue.length > 0);
		setDirty(!areArraysEqual(resolvedValue, initialValue));
		validation.change(resolvedValue);
	});
	const state = {
		...fieldState,
		disabled
	};
	const contextValue = import_react.useMemo(() => ({
		allValues,
		value,
		defaultValue,
		setValue,
		parent,
		disabled,
		validation,
		registerControlRef
	}), [
		allValues,
		value,
		defaultValue,
		setValue,
		parent,
		disabled,
		validation,
		registerControlRef
	]);
	const element = useRenderElement("div", componentProps, {
		state,
		ref: forwardedRef,
		props: [
			{
				id: idProp,
				role: "group",
				"aria-labelledby": labelId
			},
			elementProps,
			getDescriptionProps
		],
		stateAttributesMapping: fieldValidityMapping
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CheckboxGroupContext$1.Provider, {
		value: contextValue,
		children: element
	});
});
CheckboxGroup$1.displayName = "CheckboxGroup";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/CheckboxIndicator-igofmpn0wcfdqooa.js
/**
* Indicates whether the checkbox is ticked.
* Renders a `<span>` element.
*
* Documentation: [Base UI Checkbox](https://base-ui.com/react/components/checkbox)
*/
var CheckboxIndicator = /*#__PURE__*/ import_react.forwardRef(function CheckboxIndicator(componentProps, forwardedRef) {
	const { render, className, style, keepMounted = false, ...elementProps } = componentProps;
	const rootState = useCheckboxRootContext();
	const rendered = rootState.checked || rootState.indeterminate;
	const { mounted, transitionStatus, setMounted } = useTransitionStatus(rendered);
	const indicatorRef = import_react.useRef(null);
	const state = {
		...rootState,
		transitionStatus
	};
	useOpenChangeComplete({
		open: rendered,
		ref: indicatorRef,
		onComplete() {
			if (!rendered) setMounted(false);
		}
	});
	const stateAttributesMapping = {
		...useStateAttributesMapping(rootState),
		...transitionStatusMapping,
		...fieldValidityMapping
	};
	const shouldRender = keepMounted || mounted;
	const element = useRenderElement("span", componentProps, {
		ref: [forwardedRef, indicatorRef],
		state,
		stateAttributesMapping,
		props: elementProps
	});
	if (!shouldRender) return null;
	return element;
});
CheckboxIndicator.displayName = "CheckboxIndicator";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/checkbox-jachq6akfh72x12r.js
var CheckboxGroupContext = (0, import_react.createContext)({ controlFirst: true });
var CheckboxBase = (0, import_react.forwardRef)(({ className, checked, indeterminate, disabled, variant = "default", label, labelTooltip, controlFirst = true, onCheckedChange, required, name, ...props }, ref) => {
	{
		const hasLabel = Boolean(label);
		const hasAriaLabel = Boolean(props["aria-label"]);
		const hasAriaLabelledBy = Boolean(props["aria-labelledby"]);
		if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) console.warn("[Kumo Checkbox]: Checkbox must have an accessible name. Provide either:\n  - label prop: <Checkbox label='Accept terms' />\n  - aria-label: <Checkbox aria-label='Select item' />\n  - aria-labelledby for custom label association\n  Note: When used inside Checkbox.Group, label is optional");
	}
	const checkboxControl = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxRoot, {
		ref,
		"data-kumo-component": "Checkbox",
		name,
		checked,
		indeterminate,
		disabled,
		onCheckedChange,
		className: cn("relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border-0 bg-kumo-base ring after:absolute after:-inset-x-3 after:-inset-y-2 focus:outline-none", label && "mt-0.5", variant === "error" ? "ring-kumo-danger" : "ring-kumo-hairline", !disabled && "hover:ring-kumo-hairline focus:ring-2 focus:ring-kumo-focus focus-visible:ring-2 focus-visible:ring-kumo-brand", "data-[checked]:bg-kumo-contrast data-[checked]:ring-kumo-contrast data-[indeterminate]:bg-kumo-contrast data-[indeterminate]:ring-kumo-contrast", disabled && "cursor-not-allowed opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
			keepMounted: true,
			className: "flex items-center justify-center text-kumo-inverse data-[unchecked]:invisible",
			render: (renderProps, state) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				...renderProps,
				children: state.indeterminate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {
					weight: "bold",
					size: 12
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {
					weight: "bold",
					size: 12
				})
			})
		})
	});
	if (!label) return checkboxControl;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRoot, {
		className: "inline-flex",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldLabel, {
			className: cn("!m-0 inline-flex !min-h-0 items-start gap-2 !text-base", controlFirst ? "flex-row" : "flex-row-reverse justify-end", disabled ? "cursor-not-allowed" : "cursor-pointer"),
			children: [checkboxControl, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				showOptional: required === false,
				tooltip: labelTooltip,
				asContent: true,
				children: label
			})]
		})
	});
});
CheckboxBase.displayName = "Checkbox";
var CheckboxItem = (0, import_react.forwardRef)(({ className, checked, indeterminate, disabled, variant = "default", label, value, onCheckedChange, name }, ref) => {
	const { controlFirst } = (0, import_react.useContext)(CheckboxGroupContext);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		"data-kumo-component": "Checkbox",
		"data-kumo-part": "item-label",
		className: cn("relative m-0 inline-flex items-start gap-2", !controlFirst && "flex-row-reverse justify-end", disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxRoot, {
			ref,
			"data-kumo-component": "Checkbox",
			"data-kumo-part": "item",
			value,
			name,
			checked,
			indeterminate,
			disabled,
			onCheckedChange,
			className: cn("peer relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border-0 bg-kumo-base ring after:absolute after:-inset-x-3 after:-inset-y-2", variant === "error" ? "ring-kumo-danger" : "ring-kumo-hairline", !disabled && "group-hover:ring-kumo-hairline hover:ring-kumo-hairline focus:ring-2 focus:ring-kumo-focus focus-visible:ring-2 focus-visible:ring-kumo-brand", "data-[checked]:bg-kumo-contrast data-[checked]:ring-kumo-contrast data-[indeterminate]:bg-kumo-contrast data-[indeterminate]:ring-kumo-contrast"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
				keepMounted: true,
				className: "flex items-center justify-center text-kumo-inverse data-[unchecked]:invisible",
				render: (renderProps, state) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					...renderProps,
					children: state.indeterminate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {
						weight: "bold",
						size: 12
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {
						weight: "bold",
						size: 12
					})
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-base text-kumo-default",
			children: label
		})]
	});
});
CheckboxItem.displayName = "Checkbox.Item";
function CheckboxLegend({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldsetLegend, {
		className: cn("text-base font-medium text-kumo-default", className),
		children
	});
}
CheckboxLegend.displayName = "Checkbox.Legend";
function CheckboxGroup({ legend, children, error, description, defaultValue, value, onValueChange, allValues, disabled, controlFirst = true, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxGroupContext.Provider, {
		value: { controlFirst },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxGroup$1, {
			defaultValue,
			value,
			onValueChange,
			allValues,
			disabled,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldsetRoot, {
				className: cn("flex flex-col gap-4", className),
				children: [
					legend && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldsetLegend, {
						className: "text-base font-medium text-kumo-default",
						children: legend
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2",
						children
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-kumo-danger",
						children: error
					}),
					description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-kumo-subtle",
						children: description
					})
				]
			})
		})
	});
}
var Checkbox = Object.assign(CheckboxBase, {
	Item: CheckboxItem,
	Group: CheckboxGroup,
	Legend: CheckboxLegend
});
Checkbox.displayName = "Checkbox";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/table-miggde3uqhhrd5at.js
/** Table layout and row variant definitions mapping names to their Tailwind classes. */
var KUMO_TABLE_VARIANTS = {
	layout: {
		auto: {
			classes: "",
			description: "Auto table layout - columns resize based on content"
		},
		fixed: {
			classes: "table-fixed",
			description: "Fixed table layout - columns have equal width, controlled via colgroup"
		}
	},
	variant: {
		default: {
			classes: "even:bg-kumo-elevated [--kumo-table-row-bg:var(--color-kumo-base)] even:[--kumo-table-row-bg:var(--color-kumo-elevated)]",
			description: "Default row variant"
		},
		selected: {
			classes: "bg-kumo-tint [--kumo-table-row-bg:var(--color-kumo-tint)]",
			description: "Selected row variant"
		}
	},
	sticky: {
		left: {
			classes: "sticky left-0",
			description: "Pin column to the left edge of the scroll container"
		},
		right: {
			classes: "sticky right-0",
			description: "Pin column to the right edge of the scroll container"
		}
	}
};
/**
* Shared sticky-column styles for `<th>` and `<td>`.
*
* - Opaque background so scrolling content doesn't show through.
* - Gradient fade on the inner edge so the sticky boundary isn't a hard clip.
* - z-index kept to z-0/z-1/z-2 within the table's `isolate` stacking context:
*   - `z-0` — normal cells (default)
*   - `z-1` — sticky body cells (`<td>`)
*   - `z-2` — sticky header cells (`<th>`) so they sit above sticky body cells
*
* Header cells use `:has()` to detect if they're in a compact header (which has
* `bg-kumo-elevated`) and adjust both the background and gradient fade colors.
*/
var stickyColumnClasses = (side, element) => {
	const base = resolveVariant(KUMO_TABLE_VARIANTS.sticky, side, "left").classes;
	const z = element === "head" ? "z-2" : "z-1";
	const fadePosition = side === "right" ? "before:-left-6" : "before:-right-6";
	const fadeBase = "before:pointer-events-none before:absolute before:inset-y-0 before:w-6";
	if (element === "cell") return cn(base, z, "bg-(--kumo-table-row-bg)", fadeBase, fadePosition, side === "right" ? "before:bg-gradient-to-r before:from-transparent before:to-(--kumo-table-row-bg)" : "before:bg-gradient-to-l before:from-transparent before:to-(--kumo-table-row-bg)");
	return cn(base, z, "bg-kumo-base group-data-[compact]/header:bg-kumo-elevated", fadeBase, fadePosition, side === "right" ? "before:bg-gradient-to-r before:from-transparent before:to-kumo-base group-data-[compact]/header:before:to-kumo-elevated" : "before:bg-gradient-to-l before:from-transparent before:to-kumo-base group-data-[compact]/header:before:to-kumo-elevated");
};
var KUMO_TABLE_DEFAULT_VARIANTS = {
	layout: "auto",
	variant: "default"
};
/**
* Table root — applies layout, padding, and header styles.
*
* @example
* ```tsx
* <Table layout="fixed">
*   <Table.Header>
*     <Table.Row>
*       <Table.Head>Name</Table.Head>
*       <Table.Head>Status</Table.Head>
*     </Table.Row>
*   </Table.Header>
*   <Table.Body>
*     <Table.Row>
*       <Table.Cell>Worker A</Table.Cell>
*       <Table.Cell>Active</Table.Cell>
*     </Table.Row>
*   </Table.Body>
* </Table>
* ```
*/
var TableRoot = (0, import_react.forwardRef)(({ layout = "auto", ...props }, ref) => {
	const className = cn("isolate w-full", resolveVariant(KUMO_TABLE_VARIANTS.layout, layout, KUMO_TABLE_DEFAULT_VARIANTS.layout).classes, "[&_td]:p-3", "[&_th]:border-b [&_th]:border-kumo-fill [&_th]:p-3 [&_th]:text-base [&_th]:font-semibold", "[&_th]:bg-kumo-base", "text-left text-base text-kumo-default", props.className);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		ref,
		...props,
		className
	});
});
var TableHeader = (0, import_react.forwardRef)(({ variant = "default", sticky, ...props }, ref) => {
	const isCompact = variant === "compact";
	const className = cn("group/header", isCompact && "text-xs text-kumo-strong [&_th]:bg-kumo-elevated [&_th]:py-2", sticky && "[&_th]:sticky [&_th]:top-0 [&_th]:z-1", props.className);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
		ref,
		...props,
		className,
		...isCompact && { "data-compact": "" }
	});
});
var TableHead = (0, import_react.forwardRef)(({ sticky, ...props }, ref) => {
	const className = cn("group relative", sticky && stickyColumnClasses(sticky, "head"), props.className);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		ref,
		...props,
		className
	});
});
var TableRow = (0, import_react.forwardRef)(({ variant = KUMO_TABLE_DEFAULT_VARIANTS.variant, ...props }, ref) => {
	const className = cn(resolveVariant(KUMO_TABLE_VARIANTS.variant, variant, KUMO_TABLE_DEFAULT_VARIANTS.variant).classes, props.className);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
		ref,
		...props,
		className
	});
});
var TableBody = (0, import_react.forwardRef)((props, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
		ref,
		...props
	});
});
var TableCell = (0, import_react.forwardRef)(({ sticky, ...props }, ref) => {
	const className = cn(sticky && stickyColumnClasses(sticky, "cell"), props.className);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		ref,
		...props,
		className
	});
});
var TableFooter = (0, import_react.forwardRef)((props, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
		ref,
		...props
	});
});
var TableResizeHandle = (0, import_react.forwardRef)((props, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		ref,
		...props,
		type: "button",
		"aria-label": "Resize column",
		className: cn("invisible h-full group-hover:visible", "w-[10px]", "flex items-center justify-center", "cursor-col-resize touch-none select-none", "absolute top-0 right-0", "m-0 bg-kumo-base p-0", "focus-visible:ring-2 focus-visible:ring-kumo-brand"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-5 w-[2px] rounded bg-kumo-hairline" })
	});
});
/**
* Special cell that makes the entire cell area a hit target for the checkbox.
*/
var TableCheckCell = (0, import_react.forwardRef)(({ checked, indeterminate, onCheckedChange, onValueChange, label, disabled, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
		ref,
		...props,
		className: cn("w-10 leading-none", props.className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
			checked,
			indeterminate,
			onCheckedChange: (newChecked, eventDetails) => {
				onCheckedChange?.(newChecked, eventDetails);
				onValueChange?.(newChecked);
			},
			"aria-label": label ?? "Select row",
			disabled,
			className: "relative before:absolute before:-inset-3 before:content-['']"
		})
	});
});
var TableCheckHead = (0, import_react.forwardRef)(({ checked, indeterminate, onCheckedChange, onValueChange, label, disabled, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
		ref,
		...props,
		className: cn("w-10 leading-none", props.className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
			checked,
			indeterminate,
			onCheckedChange: (newChecked, eventDetails) => {
				onCheckedChange?.(newChecked, eventDetails);
				onValueChange?.(newChecked);
			},
			"aria-label": label ?? "Select all rows",
			disabled,
			className: "relative before:absolute before:-inset-3 before:content-['']"
		})
	});
});
TableRoot.displayName = "Table";
TableBody.displayName = "Table.Body";
TableHead.displayName = "Table.Head";
TableRow.displayName = "Table.Row";
TableCell.displayName = "Table.Cell";
TableFooter.displayName = "Table.Footer";
TableHeader.displayName = "Table.Header";
TableResizeHandle.displayName = "Table.ResizeHandle";
TableCheckCell.displayName = "Table.CheckCell";
TableCheckHead.displayName = "Table.CheckHead";
/**
* Table — semantic HTML table with styled rows, cells, and selection support.
*
* Compound component: `Table` (Root), `.Header`, `.Head`, `.Body`, `.Row`,
* `.Cell`, `.Footer`, `.CheckCell`, `.CheckHead`, `.ResizeHandle`.
*
* @example
* ```tsx
* <Table>
*   <Table.Header>
*     <Table.Row>
*       <Table.CheckHead checked={allSelected} onCheckedChange={toggleAll} />
*       <Table.Head>Name</Table.Head>
*     </Table.Row>
*   </Table.Header>
*   <Table.Body>
*     {rows.map((row) => (
*       <Table.Row key={row.id} variant={selected.has(row.id) ? "selected" : "default"}>
*         <Table.CheckCell checked={selected.has(row.id)} onCheckedChange={() => toggle(row.id)} />
*         <Table.Cell>{row.name}</Table.Cell>
*       </Table.Row>
*     ))}
*   </Table.Body>
* </Table>
* ```
*/
var Table = Object.assign(TableRoot, {
	Header: TableHeader,
	Head: TableHead,
	Row: TableRow,
	Body: TableBody,
	Cell: TableCell,
	CheckCell: TableCheckCell,
	CheckHead: TableCheckHead,
	Footer: TableFooter,
	ResizeHandle: TableResizeHandle
});
//#endregion
export { Table as t };
