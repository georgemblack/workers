import { y as __toESM } from "./createServerFn-TpCK4c9B.js";
import { a as require_react, i as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
import { D as useTransitionStatus, Wt as transitionStatusMapping, X as visuallyHiddenInput, Y as visuallyHidden, Z as useStableCallback, c as useBaseUiId, fn as useRenderElement, hn as cn, in as EMPTY_OBJECT, k as useOpenChangeComplete, ln as mergeProps, lt as createChangeEventDetails, mn as resolveVariant, ot as none, qt as getWindow, rn as EMPTY_ARRAY, tn as useIsoLayoutEffect, un as useMergedRefs } from "./button-hzvowfkbathmx8yg-Ddqo88Fb.js";
import { a as o, i as useControlled, n as useButton, r as areArraysEqual, t as dispatchClickWithModifiers } from "./useButton-lklvdzuhvj22bx07-DYh_xUCv.js";
import { _ as useFieldsetRootContext, a as FieldLabel, d as useFormContext, f as fieldValidityMapping, g as FieldsetRootContext, h as useRegisteredLabelId, i as useLabelableId, l as isEligibleInput, m as useLabelableContext, n as useValueChanged, o as FieldRoot, p as useFieldRootContext, r as useRegisterFieldControl, s as useFieldItemContext, t as useSetFieldFocused, v as Label, y as p } from "./useSetFieldFocused-fbvj7gcv67dqfkp0-BVPDsXjs.js";
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
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/FieldsetLegend-gl9z9eezr0xg9zr7.js
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
	const id = useRegisteredLabelId(idProp, setLegendId);
	return useRenderElement("div", componentProps, {
		state: { disabled },
		ref: forwardedRef,
		props: [{ id }, elementProps]
	});
});
FieldsetLegend.displayName = "FieldsetLegend";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/CheckboxGroupContext-jf1bt3znvqlhrql6.js
var CheckboxGroupContext$1 = /*#__PURE__*/ import_react.createContext(void 0);
CheckboxGroupContext$1.displayName = "CheckboxGroupContext";
function useCheckboxGroupContext() {
	return import_react.useContext(CheckboxGroupContext$1);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/CheckboxGroup-581mfftu99wvjb3a.js
function useCheckboxGroupParent(params) {
	const { allValues = EMPTY_ARRAY, value, onValueChange: onValueChangeProp } = params;
	const uncontrolledStateRef = import_react.useRef(value);
	const disabledStatesRef = import_react.useRef(/* @__PURE__ */ new Map());
	const [status, setStatus] = import_react.useState("mixed");
	const [childIdsState, setChildIdsState] = import_react.useState(() => ({ registry: /* @__PURE__ */ new Map() }));
	const checked = value.length === allValues.length;
	const indeterminate = value.length !== allValues.length && value.length > 0;
	const onValueChange = useStableCallback(onValueChangeProp);
	const registerChildId = useStableCallback((childValue, childId) => {
		const childIds = childIdsState.registry;
		childIds.set(childValue, (childIds.get(childValue) ?? EMPTY_ARRAY).concat(childId));
		setChildIdsState({ registry: childIds });
		return () => {
			const nextIds = (childIds.get(childValue) ?? EMPTY_ARRAY).filter((id) => id !== childId);
			if (nextIds.length === 0) childIds.delete(childValue);
			else childIds.set(childValue, nextIds);
			setChildIdsState({ registry: childIds });
		};
	});
	const getParentProps = import_react.useCallback(() => ({
		indeterminate,
		checked,
		"aria-controls": allValues.flatMap((v) => childIdsState.registry.get(v) ?? EMPTY_ARRAY).join(" ") || void 0,
		onCheckedChange(_, eventDetails) {
			const uncontrolledState = uncontrolledStateRef.current;
			const none = allValues.filter((v) => disabledStatesRef.current.get(v) && uncontrolledState.includes(v));
			const all = allValues.filter((v) => !disabledStatesRef.current.get(v) || uncontrolledState.includes(v));
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
		childIdsState,
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
		getParentProps,
		getChildProps,
		registerChildId,
		disabledStatesRef
	}), [
		getParentProps,
		getChildProps,
		registerChildId
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
	const { labelId, registerControlId, getDescriptionProps } = useLabelableContext();
	const { clearErrors, elementRef } = useFormContext();
	const disabled = fieldDisabled || disabledProp;
	const [value, setValueUnwrapped] = useControlled({
		controlled: externalValue,
		default: defaultValueProp ?? EMPTY_ARRAY,
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
	useLabelableId({ id: null });
	const id = useBaseUiId(idProp);
	const getInputControl = validation.getInputControl;
	const controlRef = import_react.useMemo(() => ({ get current() {
		return getInputControl();
	} }), [getInputControl]);
	const getFormValue = useStableCallback(() => {
		const formElement = elementRef.current;
		if (!formElement) return value;
		const successfulValues = /* @__PURE__ */ new Set();
		for (const [input, registration] of validation.registeredInputs) if (registration.value !== void 0 && input.checked && isEligibleInput(input, formElement)) successfulValues.add(registration.value);
		return value.filter((inputValue) => successfulValues.has(inputValue));
	});
	useRegisterFieldControl(controlRef, id, value, getFormValue, !!fieldName && !disabled, fieldName);
	useIsoLayoutEffect(() => {
		setFilled(value.length > 0);
	}, [value, setFilled]);
	useValueChanged(value, () => {
		if (fieldName) clearErrors(fieldName);
		const initialValue = Array.isArray(validityData.initialValue) ? validityData.initialValue : EMPTY_ARRAY;
		setDirty(!areArraysEqual(value, initialValue));
		validation.change(value);
	});
	const state = {
		...fieldState,
		disabled
	};
	const contextValue = import_react.useMemo(() => ({
		allValues,
		value,
		setValue,
		parent,
		disabled,
		validation,
		registerControlId
	}), [
		allValues,
		value,
		setValue,
		parent,
		disabled,
		validation,
		registerControlId
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
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useAriaLabelledBy-j3j9jqlr9ukyk08s.js
function useAriaLabelledBy(explicitAriaLabelledBy, labelId, labelSourceRef, enableFallback = true, labelSourceId, ariaLabel) {
	const [fallbackAriaLabelledBy, setFallbackAriaLabelledBy] = import_react.useState();
	const generatedLabelId = useBaseUiId(labelSourceId ? `${labelSourceId}-label` : void 0);
	const hasAriaLabel = Boolean(ariaLabel?.trim());
	const ariaLabelledBy = explicitAriaLabelledBy ?? (hasAriaLabel ? void 0 : labelId) ?? fallbackAriaLabelledBy;
	useIsoLayoutEffect(() => {
		const nextAriaLabelledBy = explicitAriaLabelledBy || labelId || hasAriaLabel || !enableFallback ? void 0 : getAriaLabelledBy(labelSourceRef.current, generatedLabelId);
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
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/CheckboxIndicator-i13dmhacfgqo328c.js
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
/**
* Present when the checkbox is checked.
*/
var checked = "data-checked";
/**
* Present when the checkbox is not checked.
*/
var unchecked = "data-unchecked";
function getCheckboxStateAttributesMapping(state) {
	return {
		checked(value) {
			if (state.indeterminate) return {};
			if (value) return { [checked]: "" };
			return { [unchecked]: "" };
		},
		...fieldValidityMapping
	};
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
	const { disabled: rootDisabled, name: fieldName, setDirty, setFilled, setTouched, state: fieldState, validationMode, validityData, validation: localValidation } = useFieldRootContext();
	const fieldItemContext = useFieldItemContext();
	const { labelId, registerControlId, getDescriptionProps } = useLabelableContext();
	const groupContext = useCheckboxGroupContext();
	const parentContext = groupContext?.allValues === void 0 ? void 0 : groupContext.parent;
	const isGroupedWithParent = parentContext !== void 0;
	const disabled = rootDisabled || fieldItemContext.disabled || groupContext?.disabled || disabledProp;
	const name = fieldName ?? nameProp;
	const value = valueProp ?? name;
	const id = useBaseUiId();
	const ownsControlId = groupContext?.registerControlId !== registerControlId;
	const controlId = useLabelableId({
		id: idProp || void 0,
		enabled: ownsControlId
	});
	const rootId = nativeButton ? controlId : id;
	let groupProps = {};
	if (isGroupedWithParent) {
		if (parent) groupProps = parentContext.getParentProps();
		else if (value !== void 0) groupProps = parentContext.getChildProps(value);
	}
	const { checked: groupChecked = checkedProp, indeterminate: groupIndeterminate = indeterminate, onCheckedChange: groupOnChange, ...otherGroupProps } = groupProps;
	const groupValue = groupContext?.value;
	const controlRef = import_react.useRef(null);
	const setFocused = useSetFieldFocused(disabled, controlRef);
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton
	});
	const validation = groupContext?.validation ?? localValidation;
	const [checked, setCheckedState] = useControlled({
		controlled: value !== void 0 && groupValue !== void 0 && !parent ? groupValue.includes(value) : groupChecked,
		default: defaultChecked,
		name: "Checkbox",
		state: "checked"
	});
	const computedChecked = isGroupedWithParent ? Boolean(groupChecked) : checked;
	const computedIndeterminate = isGroupedWithParent ? groupIndeterminate || indeterminate : indeterminate;
	useRegisterFieldControl(controlRef, id, checked, void 0, !groupContext && !disabled, nameProp);
	const registerChildId = parentContext?.registerChildId;
	const inputRef = import_react.useRef(null);
	const registerFieldInput = validation.registerInput;
	const registeredInputValue = groupContext ? value : void 0;
	const registerInput = import_react.useCallback((element) => registerFieldInput(element, {
		controlRef,
		value: registeredInputValue
	}), [registerFieldInput, registeredInputValue]);
	const mergedInputRef = useMergedRefs(inputRefProp, inputRef, parent ? void 0 : registerInput);
	const ariaLabelledBy = useAriaLabelledBy(ariaLabelledByProp, labelId, inputRef, !nativeButton, controlId, elementProps["aria-label"]);
	useIsoLayoutEffect(() => {
		if (inputRef.current) inputRef.current.indeterminate = computedIndeterminate;
		if (!groupContext) setFilled(checked);
	}, [
		checked,
		computedIndeterminate,
		groupContext,
		setFilled
	]);
	useValueChanged(checked, () => {
		if (groupContext) return;
		clearErrors(name);
		setDirty(checked !== validityData.initialValue);
		validation.change(checked);
	});
	const inputProps = mergeProps({
		checked,
		disabled,
		form,
		name: parent ? void 0 : name,
		id: nativeButton ? void 0 : controlId,
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
			if (value !== void 0 && groupContext !== void 0 && !parent && !isGroupedWithParent) {
				const nextGroupValue = nextChecked ? [...groupContext.value, value] : groupContext.value.filter((item) => item !== value);
				groupContext.setValue(nextGroupValue, details);
			}
		},
		onClick(event) {
			event.stopPropagation();
		},
		onFocus() {
			controlRef.current?.focus();
		}
	}, valueProp !== void 0 ? { value: (groupContext ? checked && valueProp : valueProp) || "" } : EMPTY_OBJECT, getDescriptionProps, (props) => validation.getValidationProps(disabled, props));
	import_react.useEffect(() => {
		if (!parentContext || value === void 0) return;
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
	const stateAttributesMapping = getCheckboxStateAttributesMapping(state);
	const element = useRenderElement("span", componentProps, {
		state,
		ref: [
			buttonRef,
			controlRef,
			forwardedRef
		],
		props: [
			{
				id: rootId,
				role: "checkbox",
				"aria-checked": computedIndeterminate ? "mixed" : computedChecked,
				"aria-readonly": readOnly || void 0,
				"aria-required": required || void 0,
				"aria-labelledby": ariaLabelledBy,
				[PARENT_CHECKBOX]: parent ? "" : void 0,
				onFocus() {
					setFocused(true);
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
					dispatchClickWithModifiers(input, event);
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
	const renderedId = element.props.id;
	useIsoLayoutEffect(() => {
		if (!registerChildId || parent || value === void 0 || renderedId === void 0) return;
		return registerChildId(value, renderedId);
	}, [
		registerChildId,
		parent,
		value,
		renderedId
	]);
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
		batch: true,
		enabled: !rendered,
		open: rendered,
		ref: indicatorRef,
		onComplete() {
			if (!rendered) setMounted(false);
		}
	});
	const stateAttributesMapping = {
		...getCheckboxStateAttributesMapping(rootState),
		...transitionStatusMapping
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
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/checkbox-eifiwbw34xwsikvf.js
var CheckboxGroupContext = (0, import_react.createContext)({
	controlFirst: void 0,
	appearance: "default",
	orientation: null
});
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
		className: cn("relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border-0 bg-kumo-base ring after:absolute after:-inset-x-3 after:-inset-y-2 focus:outline-hidden", label && "mt-0.5", variant === "error" ? "ring-kumo-danger" : "ring-kumo-hairline", !disabled && "hover:ring-kumo-hairline focus:ring-2 focus:ring-kumo-focus focus-visible:ring-2 focus-visible:ring-kumo-brand", "data-[checked]:bg-kumo-contrast data-[checked]:ring-kumo-contrast data-[indeterminate]:bg-kumo-contrast data-[indeterminate]:ring-kumo-contrast", disabled && "cursor-not-allowed opacity-50", className),
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
var CheckboxItem = (0, import_react.forwardRef)(({ className, checked, indeterminate, disabled, variant = "default", appearance: appearanceProp, label, description, value, onCheckedChange, name }, ref) => {
	const { controlFirst: groupControlFirst, appearance: groupAppearance, orientation } = (0, import_react.useContext)(CheckboxGroupContext);
	const isCard = (appearanceProp ?? groupAppearance) === "card";
	const controlFirst = groupControlFirst ?? !isCard;
	const isJoined = isCard && groupAppearance === "card" && orientation !== null;
	const indicator = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
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
	});
	if (isCard) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		"data-kumo-component": "Checkbox",
		"data-kumo-part": "item-label",
		className: cn("group relative m-0 flex items-start gap-3 bg-kumo-base p-3 has-[[data-checked]]:bg-kumo-tint", isJoined ? cn("border-b border-kumo-line bg-clip-padding last:border-b-0", orientation === "horizontal" && "odd:border-r [&:last-child:nth-child(odd)]:border-r-0 [&:nth-last-child(2):nth-child(odd)]:border-b-0") : "rounded-lg border border-kumo-hairline has-[[data-checked]]:border-kumo-interact", controlFirst && "flex-row-reverse", variant === "error" && cn("has-[[data-checked]]:bg-kumo-base", !isJoined && "border-kumo-danger has-[[data-checked]]:border-kumo-danger"), disabled ? "cursor-not-allowed opacity-50" : cn("cursor-pointer has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50", variant !== "error" && "hover:not-has-[[data-disabled]]:not-has-[[data-checked]]:bg-kumo-elevated"), className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col gap-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-base font-medium text-kumo-default",
				children: label
			}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm leading-snug text-pretty text-kumo-subtle",
				children: description
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxRoot, {
			ref,
			"data-kumo-component": "Checkbox",
			"data-kumo-part": "item",
			value,
			name,
			checked,
			indeterminate,
			disabled,
			onCheckedChange,
			className: cn("relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border-0 bg-kumo-base ring focus:ring-kumo-focus focus:outline-hidden focus-visible:ring-2 focus-visible:ring-kumo-brand", variant === "error" ? "ring-kumo-danger" : "ring-kumo-line", !disabled && variant !== "error" && "group-hover:ring-kumo-hairline", "data-[checked]:bg-kumo-contrast data-[checked]:ring-kumo-contrast data-[indeterminate]:bg-kumo-contrast data-[indeterminate]:ring-kumo-contrast"),
			children: indicator
		})]
	});
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
			children: indicator
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
function CheckboxGroup({ legend, children, error, description, defaultValue, value, onValueChange, allValues, disabled, orientation = "vertical", appearance = "default", controlFirst, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxGroupContext.Provider, {
		value: {
			controlFirst,
			appearance,
			orientation
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxGroup$1, {
			defaultValue,
			value,
			onValueChange,
			allValues,
			disabled,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldsetRoot, {
				className: cn("flex flex-col p-0", appearance === "card" ? "gap-2" : "gap-4", className),
				children: [
					legend && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldsetLegend, {
						className: "text-base font-medium text-kumo-default",
						children: legend
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn(orientation === "vertical" ? appearance === "card" ? "flex flex-col overflow-hidden rounded-lg ring ring-kumo-line" : "flex flex-col gap-2" : appearance === "card" ? "grid grid-cols-2 overflow-hidden rounded-lg bg-kumo-base ring ring-kumo-line" : "flex flex-row flex-wrap gap-2"),
						children
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-kumo-danger",
						children: error
					}),
					description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-snug text-pretty text-kumo-subtle",
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
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/table-ngl1b5yc8mcur662.js
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

//# sourceMappingURL=table-ngl1b5yc8mcur662-CAy4bvFL.js.map