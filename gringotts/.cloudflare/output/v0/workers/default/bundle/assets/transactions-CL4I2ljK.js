import { y as __toESM } from "./createServerFn-TpCK4c9B.js";
import { a as require_react, i as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
import { a as CategoryNames, c as Month, d as getMonthNumber, i as Category, l as Tag, n as AccountNames, o as Group, s as Groups, t as Account, u as TagNames } from "./Types-Ci0UbdzN.js";
import { f as updateTransaction, n as deleteTransaction, r as getMerchants, s as getTransactions } from "./db-BP1alSrj.js";
import { $t as usePortalContainer, A as CLICK_TRIGGER_IDENTIFIER, B as popupStateMapping, Dt as getTarget, E as useDismiss, F as PopupTriggerMap, H as triggerOpenStateMapping, I as ReactStore, K as transitionStatusMapping, N as FloatingPortal, S as useTriggerDataForwarding, _ as useOnFirstRender, at as createChangeEventDetails, b as usePopupRootSync, cn as useRenderElement, d as createPopupFloatingRootContext, f as popupStoreSelectors, g as useImplicitActiveTrigger, h as setPopupOpenState, i as useBaseUiId, it as closePress, j as CommonPopupDataAttributes, ln as resolveVariant, m as createDefaultInitialFocus, p as FOCUSABLE_POPUP_PROPS, q as useOpenChangeComplete, st as imperativeAction, t as Button, tn as EMPTY_OBJECT, u as createInitialPopupStoreState, un as cn, v as useOpenStateTransitions, x as usePopupStore, y as usePopupInteractionProps, yt as contains, z as createSelector } from "./button-h36q7tklakhd38nx-D4x2gb7U.js";
import { n as CategoryField, r as Autosuggest, t as TagField } from "./TagField-CAOlhKgM.js";
import { t as LayerCard } from "./layer-card-dnikj7emx8qeaspz-DaiP7zi3.js";
import { a as InternalBackdrop, c as inertValue, i as FloatingFocusManager, n as COMPOSITE_KEYS, o as useOpenMethodTriggerProps, r as useClick, s as useScrollLock, t as Select } from "./select-ndqpqpmqtmn497rq-DpJiR7X5.js";
import { r as useButton } from "./areArraysEqual-nlbeaqlzf4274zr3-C5oJLtyt.js";
import { t as Table } from "./table-miggde3uqhhrd5at-CDtco2f4.js";
import { t as Input } from "./input-pehjmr1q131tz38w-DsbPfrm6.js";
import { t as AccountSelect } from "./AccountSelect-BH9vDsLy.js";
import { t as Currency } from "./Currency-DkkFRO-M.js";
import { t as YearFilter } from "./YearFilter-BWNhexqg.js";
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/useRenderDialogRoot-hhowqeoreyr6uuc7.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var IsDrawerContext = /*#__PURE__*/ import_react.createContext(false);
IsDrawerContext.displayName = "IsDrawerContext";
var DialogRootContext = /*#__PURE__*/ import_react.createContext(void 0);
DialogRootContext.displayName = "DialogRootContext";
function useDialogRootContext(optional) {
	const dialogRootContext = import_react.useContext(DialogRootContext);
	if (optional === false && dialogRootContext === void 0) throw new Error("Base UI: DialogRootContext is missing. Dialog parts must be placed within <Dialog.Root>.");
	return dialogRootContext;
}
var DialogPortalContext = /*#__PURE__*/ import_react.createContext(void 0);
DialogPortalContext.displayName = "DialogPortalContext";
function useDialogPortalContext() {
	const value = import_react.useContext(DialogPortalContext);
	if (value === void 0) throw new Error("Base UI: <Dialog.Portal> is missing.");
	return value;
}
/**
* A portal element that moves the popup to a different part of the DOM.
* By default, the portal element is appended to `<body>`.
* Renders a `<div>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogPortal = /*#__PURE__*/ import_react.forwardRef(function DialogPortal(props, forwardedRef) {
	const { keepMounted = false, ...portalProps } = props;
	const { store } = useDialogRootContext();
	const mounted = store.useState("mounted");
	const modal = store.useState("modal");
	const open = store.useState("open");
	if (!(mounted || keepMounted)) return null;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DialogPortalContext.Provider, {
		value: keepMounted,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(FloatingPortal, {
			ref: forwardedRef,
			...portalProps,
			children: [mounted && modal === true && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(InternalBackdrop, {
				ref: store.context.internalBackdropRef,
				inert: inertValue(!open)
			}), props.children]
		})
	});
});
DialogPortal.displayName = "DialogPortal";
function useDialogRoot(params) {
	const { store, actionsRef } = params;
	const open = store.useState("open");
	usePopupRootSync(store, open);
	useImplicitActiveTrigger(store);
	const { forceUnmount } = useOpenStateTransitions(open, store);
	const handleImperativeClose = import_react.useCallback(() => {
		store.setOpen(false, createChangeEventDetails(imperativeAction));
	}, [store]);
	import_react.useImperativeHandle(actionsRef, () => ({
		unmount: forceUnmount,
		close: handleImperativeClose
	}), [forceUnmount, handleImperativeClose]);
}
function DialogInteractions({ store, parentContext, isDrawer }) {
	const open = store.useState("open");
	const disablePointerDismissal = store.useState("disablePointerDismissal");
	const modal = store.useState("modal");
	const popupElement = store.useState("popupElement");
	const floatingRootContext = store.useState("floatingRootContext");
	const [ownNestedOpenDialogs, setOwnNestedOpenDialogs] = import_react.useState(0);
	const [ownNestedOpenDrawers, setOwnNestedOpenDrawers] = import_react.useState(0);
	const isTopmost = ownNestedOpenDialogs === 0;
	const dismiss = useDismiss(floatingRootContext, {
		outsidePressEvent() {
			if (store.context.internalBackdropRef.current || store.context.backdropRef.current) return "intentional";
			return {
				mouse: modal === "trap-focus" ? "sloppy" : "intentional",
				touch: "sloppy"
			};
		},
		outsidePress(event) {
			if (!store.context.outsidePressEnabledRef.current) return false;
			if ("button" in event && event.button !== 0) return false;
			if ("touches" in event && event.touches.length !== 1) return false;
			const target = getTarget(event);
			if (isTopmost && !disablePointerDismissal) {
				if (modal) return store.context.internalBackdropRef.current || store.context.backdropRef.current ? store.context.internalBackdropRef.current === target || store.context.backdropRef.current === target || contains(target, popupElement) && !target?.hasAttribute("data-base-ui-portal") : true;
				return true;
			}
			return false;
		},
		escapeKey: isTopmost
	});
	useScrollLock(open && modal === true, popupElement);
	store.useContextCallback("onNestedDialogOpen", (dialogCount, drawerCount) => {
		setOwnNestedOpenDialogs(dialogCount);
		setOwnNestedOpenDrawers(drawerCount);
	});
	store.useContextCallback("onNestedDialogClose", () => {
		setOwnNestedOpenDialogs(0);
		setOwnNestedOpenDrawers(0);
	});
	import_react.useEffect(() => {
		if (parentContext?.onNestedDialogOpen && open) parentContext.onNestedDialogOpen(ownNestedOpenDialogs + 1, ownNestedOpenDrawers + (isDrawer ? 1 : 0));
		if (parentContext?.onNestedDialogClose && !open) parentContext.onNestedDialogClose();
		return () => {
			if (parentContext?.onNestedDialogClose && open) parentContext.onNestedDialogClose();
		};
	}, [
		isDrawer,
		open,
		ownNestedOpenDialogs,
		ownNestedOpenDrawers,
		parentContext
	]);
	usePopupInteractionProps(store, {
		activeTriggerProps: dismiss.reference ?? EMPTY_OBJECT,
		inactiveTriggerProps: dismiss.trigger ?? EMPTY_OBJECT,
		popupProps: dismiss.floating ?? EMPTY_OBJECT,
		nestedOpenDialogCount: ownNestedOpenDialogs,
		nestedOpenDrawerCount: ownNestedOpenDrawers
	});
	return null;
}
var selectors = {
	...popupStoreSelectors,
	modal: createSelector((state) => state.modal),
	nested: createSelector((state) => state.nested),
	nestedOpenDialogCount: createSelector((state) => state.nestedOpenDialogCount),
	nestedOpenDrawerCount: createSelector((state) => state.nestedOpenDrawerCount),
	disablePointerDismissal: createSelector((state) => state.disablePointerDismissal),
	openMethod: createSelector((state) => state.openMethod),
	descriptionElementId: createSelector((state) => state.descriptionElementId),
	titleElementId: createSelector((state) => state.titleElementId),
	viewportElement: createSelector((state) => state.viewportElement),
	role: createSelector((state) => state.role)
};
var DialogStore = class DialogStore extends ReactStore {
	constructor(initialState, floatingId, nested = false) {
		const triggerElements = new PopupTriggerMap();
		const state = createInitialState(initialState);
		state.floatingRootContext = createPopupFloatingRootContext(triggerElements, floatingId, nested);
		super(state, {
			popupRef: /*#__PURE__*/ import_react.createRef(),
			backdropRef: /*#__PURE__*/ import_react.createRef(),
			internalBackdropRef: /*#__PURE__*/ import_react.createRef(),
			outsidePressEnabledRef: { current: true },
			triggerElements,
			onOpenChange: void 0,
			onOpenChangeComplete: void 0
		}, selectors);
	}
	setOpen = (nextOpen, eventDetails) => {
		eventDetails.preventUnmountOnClose = () => {
			this.set("preventUnmountingOnClose", true);
		};
		if (!nextOpen && eventDetails.trigger == null && this.state.activeTriggerId != null) eventDetails.trigger = this.state.activeTriggerElement ?? void 0;
		this.context.onOpenChange?.(nextOpen, eventDetails);
		if (eventDetails.isCanceled) return;
		this.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
		const updatedState = { open: nextOpen };
		setPopupOpenState(updatedState, nextOpen, eventDetails.trigger);
		this.update(updatedState);
	};
	static useStore(externalStore, initialState) {
		return usePopupStore(externalStore, (floatingId, nested) => new DialogStore(initialState, floatingId, nested), true).store;
	}
};
function createInitialState(initialState = {}) {
	return {
		...createInitialPopupStoreState(),
		modal: true,
		disablePointerDismissal: false,
		popupElement: null,
		viewportElement: null,
		descriptionElementId: void 0,
		titleElementId: void 0,
		openMethod: null,
		nested: false,
		nestedOpenDialogCount: 0,
		nestedOpenDrawerCount: 0,
		role: "dialog",
		...initialState
	};
}
function useRenderDialogRoot(props, mode = "dialog") {
	const { children, open: openProp, defaultOpen = false, onOpenChange, onOpenChangeComplete, disablePointerDismissal: disablePointerDismissalProp = false, modal: modalProp = true, actionsRef, handle, triggerId: triggerIdProp, defaultTriggerId: defaultTriggerIdProp = null } = props;
	const isDrawer = mode === "drawer";
	const isAlertDialog = mode === "alert-dialog";
	const modal = isAlertDialog ? true : modalProp;
	const disablePointerDismissal = isAlertDialog || disablePointerDismissalProp;
	const role = isAlertDialog ? "alertdialog" : "dialog";
	const parentDialogRootContext = useDialogRootContext(true);
	const rootState = {
		modal,
		disablePointerDismissal,
		nested: Boolean(parentDialogRootContext),
		role
	};
	const store = DialogStore.useStore(handle?.store, {
		open: defaultOpen,
		openProp,
		activeTriggerId: defaultTriggerIdProp,
		triggerIdProp,
		...rootState
	});
	useOnFirstRender(() => {
		const nextState = openProp === void 0 && store.state.open === false && defaultOpen === true ? {
			open: true,
			activeTriggerId: defaultTriggerIdProp
		} : null;
		if (isAlertDialog) store.update(nextState ? {
			...rootState,
			...nextState
		} : rootState);
		else if (nextState) store.update(nextState);
	});
	store.useControlledProp("openProp", openProp);
	store.useControlledProp("triggerIdProp", triggerIdProp);
	store.useSyncedValues(rootState);
	store.useContextCallback("onOpenChange", onOpenChange);
	store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
	const open = store.useState("open");
	const mounted = store.useState("mounted");
	const payload = store.useState("payload");
	useDialogRoot({
		store,
		actionsRef
	});
	const shouldRenderInteractions = open || mounted;
	const contextValue = import_react.useMemo(() => ({ store }), [store]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(IsDrawerContext.Provider, {
		value: false,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(DialogRootContext.Provider, {
			value: contextValue,
			children: [shouldRenderInteractions && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DialogInteractions, {
				store,
				parentContext: parentDialogRootContext?.store.context,
				isDrawer
			}), typeof children === "function" ? children({ payload }) : children]
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/DialogPopup-mp89aob2nown2akq.js
var stateAttributesMapping$1 = {
	...popupStateMapping,
	...transitionStatusMapping
};
/**
* An overlay displayed beneath the popup.
* Renders a `<div>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogBackdrop = /*#__PURE__*/ import_react.forwardRef(function DialogBackdrop(componentProps, forwardedRef) {
	const { render, className, style, forceRender = false, ...elementProps } = componentProps;
	const { store } = useDialogRootContext();
	const open = store.useState("open");
	const nested = store.useState("nested");
	const mounted = store.useState("mounted");
	return useRenderElement("div", componentProps, {
		state: {
			open,
			transitionStatus: store.useState("transitionStatus")
		},
		ref: [store.context.backdropRef, forwardedRef],
		stateAttributesMapping: stateAttributesMapping$1,
		props: [{
			role: "presentation",
			hidden: !mounted,
			style: {
				userSelect: "none",
				WebkitUserSelect: "none"
			}
		}, elementProps],
		enabled: forceRender || !nested
	});
});
DialogBackdrop.displayName = "DialogBackdrop";
var DialogPopupCssVars = /*#__PURE__*/ function(DialogPopupCssVars) {
	/**
	* Indicates how many dialogs are nested within.
	* @type {number}
	*/
	DialogPopupCssVars["nestedDialogs"] = "--nested-dialogs";
	return DialogPopupCssVars;
}({});
var DialogPopupDataAttributes = function(DialogPopupDataAttributes) {
	/**
	* Present when the dialog is open.
	*/
	DialogPopupDataAttributes[DialogPopupDataAttributes["open"] = CommonPopupDataAttributes.open] = "open";
	/**
	* Present when the dialog is closed.
	*/
	DialogPopupDataAttributes[DialogPopupDataAttributes["closed"] = CommonPopupDataAttributes.closed] = "closed";
	/**
	* Present when the dialog is animating in.
	*/
	DialogPopupDataAttributes[DialogPopupDataAttributes["startingStyle"] = CommonPopupDataAttributes.startingStyle] = "startingStyle";
	/**
	* Present when the dialog is animating out.
	*/
	DialogPopupDataAttributes[DialogPopupDataAttributes["endingStyle"] = CommonPopupDataAttributes.endingStyle] = "endingStyle";
	/**
	* Present when the dialog is nested within another dialog.
	*/
	DialogPopupDataAttributes["nested"] = "data-nested";
	/**
	* Present when the dialog has other open dialogs nested within it.
	*/
	DialogPopupDataAttributes["nestedDialogOpen"] = "data-nested-dialog-open";
	return DialogPopupDataAttributes;
}({});
var stateAttributesMapping = {
	...popupStateMapping,
	...transitionStatusMapping,
	nestedDialogOpen(value) {
		return value ? { [DialogPopupDataAttributes.nestedDialogOpen]: "" } : null;
	}
};
/**
* A container for the dialog contents.
* Renders a `<div>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogPopup = /*#__PURE__*/ import_react.forwardRef(function DialogPopup(componentProps, forwardedRef) {
	const { render, className, style, finalFocus, initialFocus, ...elementProps } = componentProps;
	const { store } = useDialogRootContext();
	const descriptionElementId = store.useState("descriptionElementId");
	const disablePointerDismissal = store.useState("disablePointerDismissal");
	const floatingRootContext = store.useState("floatingRootContext");
	const rootPopupProps = store.useState("popupProps");
	const modal = store.useState("modal");
	const mounted = store.useState("mounted");
	const nested = store.useState("nested");
	const nestedOpenDialogCount = store.useState("nestedOpenDialogCount");
	const open = store.useState("open");
	const openMethod = store.useState("openMethod");
	const titleElementId = store.useState("titleElementId");
	const transitionStatus = store.useState("transitionStatus");
	const role = store.useState("role");
	const floatingId = floatingRootContext.useState("floatingId");
	const popupId = elementProps.id ?? floatingId;
	useDialogPortalContext();
	useOpenChangeComplete({
		open,
		ref: store.context.popupRef,
		onComplete() {
			if (open) store.context.onOpenChangeComplete?.(true);
		}
	});
	const resolvedInitialFocus = initialFocus === void 0 ? createDefaultInitialFocus(store.context.popupRef) : initialFocus;
	const nestedDialogOpen = nestedOpenDialogCount > 0;
	const setPopupElement = store.useStateSetter("popupElement");
	const element = useRenderElement("div", componentProps, {
		state: {
			open,
			nested,
			transitionStatus,
			nestedDialogOpen
		},
		props: [
			rootPopupProps,
			{
				id: popupId,
				"aria-labelledby": titleElementId ?? void 0,
				"aria-describedby": descriptionElementId ?? void 0,
				role,
				...FOCUSABLE_POPUP_PROPS,
				hidden: !mounted,
				onKeyDown(event) {
					if (COMPOSITE_KEYS.has(event.key)) event.stopPropagation();
				},
				style: { [DialogPopupCssVars.nestedDialogs]: nestedOpenDialogCount }
			},
			elementProps
		],
		ref: [
			forwardedRef,
			store.context.popupRef,
			setPopupElement
		],
		stateAttributesMapping
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingFocusManager, {
		context: floatingRootContext,
		openInteractionType: openMethod,
		disabled: !mounted,
		closeOnFocusOut: !disablePointerDismissal,
		initialFocus: resolvedInitialFocus,
		returnFocus: finalFocus,
		modal: modal !== false,
		restoreFocus: "popup",
		children: element
	});
});
DialogPopup.displayName = "DialogPopup";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/DialogTrigger-cmok07cf3ks0kzug.js
/**
* A button that closes the dialog.
* Renders a `<button>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogClose$1 = /*#__PURE__*/ import_react.forwardRef(function DialogClose(componentProps, forwardedRef) {
	const { render, className, style, disabled = false, nativeButton = true, ...elementProps } = componentProps;
	const { store } = useDialogRootContext();
	const open = store.useState("open");
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton
	});
	const state = { disabled };
	function handleClick(event) {
		if (open) store.setOpen(false, createChangeEventDetails(closePress, event.nativeEvent));
	}
	return useRenderElement("button", componentProps, {
		state,
		ref: [forwardedRef, buttonRef],
		props: [
			{ onClick: handleClick },
			elementProps,
			getButtonProps
		]
	});
});
DialogClose$1.displayName = "DialogClose";
/**
* A paragraph with additional information about the dialog.
* Renders a `<p>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogDescription$1 = /*#__PURE__*/ import_react.forwardRef(function DialogDescription(componentProps, forwardedRef) {
	const { render, className, style, id: idProp, ...elementProps } = componentProps;
	const { store } = useDialogRootContext();
	const id = useBaseUiId(idProp);
	store.useSyncedValueWithCleanup("descriptionElementId", id);
	return useRenderElement("p", componentProps, {
		ref: forwardedRef,
		props: [{ id }, elementProps]
	});
});
DialogDescription$1.displayName = "DialogDescription";
/**
* A heading that labels the dialog.
* Renders an `<h2>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogTitle$1 = /*#__PURE__*/ import_react.forwardRef(function DialogTitle(componentProps, forwardedRef) {
	const { render, className, style, id: idProp, ...elementProps } = componentProps;
	const { store } = useDialogRootContext();
	const id = useBaseUiId(idProp);
	store.useSyncedValueWithCleanup("titleElementId", id);
	return useRenderElement("h2", componentProps, {
		ref: forwardedRef,
		props: [{ id }, elementProps]
	});
});
DialogTitle$1.displayName = "DialogTitle";
/**
* A button that opens the dialog.
* Renders a `<button>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogTrigger$1 = /*#__PURE__*/ import_react.forwardRef(function DialogTrigger(componentProps, forwardedRef) {
	const { render, className, style, disabled = false, nativeButton = true, id: idProp, payload, handle, ...elementProps } = componentProps;
	const dialogRootContext = useDialogRootContext(true);
	const store = handle?.store ?? dialogRootContext?.store;
	if (!store) throw new Error("Base UI: <Dialog.Trigger> must be used within <Dialog.Root> or provided with a handle.");
	const thisTriggerId = useBaseUiId(idProp);
	const floatingContext = store.useState("floatingRootContext");
	const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
	const popupId = store.useState("triggerPopupId", thisTriggerId);
	const triggerElementRef = import_react.useRef(null);
	const { registerTrigger, isMountedByThisTrigger } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, { payload });
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton
	});
	const click = useClick(floatingContext, { enabled: floatingContext != null });
	const interactionTypeProps = useOpenMethodTriggerProps(() => store.select("open"), (interactionType) => {
		store.set("openMethod", interactionType);
	});
	const state = {
		disabled,
		open: isOpenedByThisTrigger
	};
	const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
	return useRenderElement("button", componentProps, {
		state,
		ref: [
			buttonRef,
			forwardedRef,
			registerTrigger,
			triggerElementRef
		],
		props: [
			click.reference,
			rootTriggerProps,
			interactionTypeProps,
			{
				[CLICK_TRIGGER_IDENTIFIER]: "",
				id: thisTriggerId,
				"aria-haspopup": "dialog",
				"aria-expanded": isOpenedByThisTrigger,
				"aria-controls": popupId
			},
			elementProps,
			getButtonProps
		],
		stateAttributesMapping: triggerOpenStateMapping
	});
});
DialogTrigger$1.displayName = "DialogTrigger";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/DialogRoot-fp7d16uxogvye294.js
/**
* Groups all parts of the dialog.
* Doesn't render its own HTML element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
function DialogRoot$1(props) {
	return useRenderDialogRoot(props, import_react.useContext(IsDrawerContext) ? "drawer" : "dialog");
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/AlertDialogTrigger-k3f8nevrda6awa4s.js
/**
* Groups all parts of the alert dialog.
* Doesn't render its own HTML element.
*
* Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
*/
function AlertDialogRoot(props) {
	return useRenderDialogRoot(props, "alert-dialog");
}
/**
* A button that opens the alert dialog.
* Renders a `<button>` element.
*
* Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
*/
var AlertDialogTrigger = DialogTrigger$1;
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/dialog-o0164pgcyc74lvp9.js
/** Dialog size variant definitions mapping sizes to their minimum widths. */
var KUMO_DIALOG_VARIANTS = {
	size: {
		base: {
			classes: "sm:w-96",
			description: "Default dialog width (384px)"
		},
		sm: {
			classes: "sm:w-72",
			description: "Small dialog for simple confirmations (288px)"
		},
		lg: {
			classes: "sm:w-[32rem]",
			description: "Large dialog for complex content (512px)"
		},
		xl: {
			classes: "sm:w-[48rem]",
			description: "Extra large dialog for detailed views (768px)"
		}
	},
	role: {
		dialog: {
			classes: "",
			description: "Standard dialog for general-purpose modals"
		},
		alertdialog: {
			classes: "",
			description: "Alert dialog for confirmation flows requiring explicit user acknowledgment"
		}
	}
};
var KUMO_DIALOG_DEFAULT_VARIANTS = {
	size: "base",
	role: "dialog"
};
var DialogRoleContext = (0, import_react.createContext)("dialog");
function useDialogRole() {
	return (0, import_react.useContext)(DialogRoleContext);
}
function dialogVariants({ size = KUMO_DIALOG_DEFAULT_VARIANTS.size } = {}) {
	return cn("shadow-m ring ring-kumo-line fixed top-8 left-1/2 sm:top-16 w-full max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-hidden rounded-xl bg-kumo-base text-kumo-default duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0", resolveVariant(KUMO_DIALOG_VARIANTS.size, size, KUMO_DIALOG_DEFAULT_VARIANTS.size).classes);
}
/**
* Modal dialog overlay with backdrop. Compound component with `Dialog.Root`,
* `Dialog.Trigger`, `Dialog.Title`, `Dialog.Description`, and `Dialog.Close`.
*
* @example
* ```tsx
* <Dialog.Root>
*   <Dialog.Trigger render={(p) => <Button {...p}>Delete</Button>} />
*   <Dialog className="p-8">
*     <Dialog.Title>Delete Item</Dialog.Title>
*     <Dialog.Description>This action cannot be undone.</Dialog.Description>
*     <Dialog.Close render={(p) => <Button variant="destructive" {...p}>Delete</Button>} />
*   </Dialog>
* </Dialog.Root>
* ```
*
* @example Alert Dialog for destructive actions
* ```tsx
* <Dialog.Root role="alertdialog">
*   <Dialog.Trigger render={(p) => <Button variant="destructive" {...p}>Delete Project</Button>} />
*   <Dialog className="p-8">
*     <Dialog.Title>Delete Project?</Dialog.Title>
*     <Dialog.Description>This action cannot be undone.</Dialog.Description>
*     <Dialog.Close render={(p) => <Button variant="secondary" {...p}>Cancel</Button>} />
*     <Dialog.Close render={(p) => <Button variant="destructive" {...p}>Delete</Button>} />
*   </Dialog>
* </Dialog.Root>
* ```
*/
function DialogContent({ className, children, style, size = KUMO_DIALOG_DEFAULT_VARIANTS.size, container: containerProp }) {
	const role = useDialogRole();
	const contextContainer = usePortalContainer();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(role === "alertdialog" ? DialogPortal : DialogPortal, {
		container: containerProp ?? contextContainer ?? void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(role === "alertdialog" ? DialogBackdrop : DialogBackdrop, { className: "fixed inset-0 bg-kumo-recessed opacity-80 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayerCard, {
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(role === "alertdialog" ? DialogPopup : DialogPopup, {}),
			className: cn(dialogVariants({ size }), className),
			style: {
				transitionProperty: "scale, opacity",
				transitionTimingFunction: "var(--default-transition-timing-function)",
				"--tw-shadow": "0 20px 25px -5px rgb(0 0 0 / 0.03), 0 8px 10px -6px rgb(0 0 0 / 0.03)",
				...style
			},
			children
		})]
	});
}
function DialogRoot(props) {
	if (props.role === "alertdialog") {
		const { children, role, ...rootProps } = props;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogRoleContext.Provider, {
			value: role,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogRoot, {
				...rootProps,
				children
			})
		});
	}
	const { children, role = KUMO_DIALOG_DEFAULT_VARIANTS.role, ...rootProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogRoleContext.Provider, {
		value: role,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogRoot$1, {
			...rootProps,
			children
		})
	});
}
DialogRoot.displayName = "Dialog.Root";
function DialogTrigger({ children, ...props }) {
	if (useDialogRole() === "alertdialog") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
		"data-kumo-component": "Dialog",
		"data-kumo-part": "trigger",
		...props,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger$1, {
		"data-kumo-component": "Dialog",
		"data-kumo-part": "trigger",
		...props,
		children
	});
}
DialogTrigger.displayName = "Dialog.Trigger";
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(useDialogRole() === "alertdialog" ? DialogTitle$1 : DialogTitle$1, {
		className,
		...props
	});
}
DialogTitle.displayName = "Dialog.Title";
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(useDialogRole() === "alertdialog" ? DialogDescription$1 : DialogDescription$1, {
		className,
		...props
	});
}
DialogDescription.displayName = "Dialog.Description";
function DialogClose({ children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(useDialogRole() === "alertdialog" ? DialogClose$1 : DialogClose$1, {
		"data-kumo-component": "Dialog",
		"data-kumo-part": "close",
		...props,
		children
	});
}
DialogClose.displayName = "Dialog.Close";
var Dialog = Object.assign(DialogContent, {
	Root: DialogRoot,
	Trigger: DialogTrigger,
	Title: DialogTitle,
	Description: DialogDescription,
	Close: DialogClose
});
//#endregion
//#region src/components/AccountFilter.tsx
function AccountFilter({ value, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
		value,
		onValueChange: (v) => onSelect(v),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Option, {
			value: "Any",
			children: "Any"
		}), Object.values(Account).map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Option, {
			value: account,
			children: AccountNames[account]
		}, account))]
	});
}
//#endregion
//#region src/components/CategoryFilter.tsx
function CategoryFilter({ value, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
		value,
		onValueChange: (v) => onSelect(v),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Option, {
			value: "Any",
			children: "Any"
		}), Object.values(Category).map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Option, {
			value: category,
			children: CategoryNames[category]
		}, category))]
	});
}
//#endregion
//#region src/components/EditTransactionDialog.tsx
function EditTransactionDialog({ transaction, onSave }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [merchants, setMerchants] = (0, import_react.useState)([]);
	const [day, setDay] = (0, import_react.useState)(transaction.day);
	const [month, setMonth] = (0, import_react.useState)(transaction.month);
	const [year, setYear] = (0, import_react.useState)(transaction.year);
	const [amount, setAmount] = (0, import_react.useState)(String(transaction.amount));
	const [merchant, setMerchant] = (0, import_react.useState)(transaction.merchant ?? "");
	const [category, setCategory] = (0, import_react.useState)(transaction.category ?? null);
	const [account, setAccount] = (0, import_react.useState)(transaction.account);
	const [notes, setNotes] = (0, import_react.useState)(transaction.notes ?? "");
	const [tag, setTag] = (0, import_react.useState)(transaction.tags?.[0] ?? null);
	(0, import_react.useEffect)(() => {
		if (open) getMerchants().then(setMerchants);
	}, [open]);
	const reset = () => {
		setDay(transaction.day);
		setMonth(transaction.month);
		setYear(transaction.year);
		setAmount(String(transaction.amount));
		setMerchant(transaction.merchant ?? "");
		setCategory(transaction.category ?? null);
		setAccount(transaction.account);
		setNotes(transaction.notes ?? "");
		setTag(transaction.tags?.[0] ?? null);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const updated = {
			...transaction,
			day,
			month,
			year,
			amount: Number(amount),
			merchant: merchant || null,
			category,
			account,
			notes: notes || null,
			tags: tag ? [tag] : null
		};
		if ((await updateTransaction({ data: updated })).success) {
			onSave(updated);
			setOpen(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog.Root, {
		open,
		onOpenChange: (next) => {
			setOpen(next);
			if (!next) reset();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog.Trigger, { render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			...p,
			variant: "secondary",
			size: "xs",
			children: "Edit"
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			size: "lg",
			className: "p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog.Title, { children: "Edit Transaction" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4",
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "w-20",
								type: "number",
								placeholder: "Month",
								value: month,
								onChange: (e) => setMonth(Number(e.target.value))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "w-20",
								type: "number",
								placeholder: "Day",
								value: day,
								onChange: (e) => setDay(Number(e.target.value))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "w-24",
								type: "number",
								placeholder: "Year",
								value: year,
								onChange: (e) => setYear(Number(e.target.value))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "flex-1",
								type: "number",
								step: "0.01",
								placeholder: "Amount",
								value: amount,
								onChange: (e) => setAmount(e.target.value)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Autosuggest, {
								value: merchant,
								suggestions: merchants,
								placeholder: "Merchant",
								onChange: setMerchant
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryField, {
								value: category,
								onSelect: setCategory
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountSelect, {
								value: account,
								onSelect: setAccount
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagField, {
								value: tag,
								onSelect: setTag
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "w-full",
							placeholder: "Notes",
							value: notes,
							onChange: (e) => setNotes(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog.Close, { render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							...p,
							type: "button",
							variant: "secondary",
							children: "Cancel"
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "primary",
							children: "Save"
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
//#region src/components/MonthFilter.tsx
function MonthFilter({ value, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
		value,
		onValueChange: (v) => onSelect(v),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Option, {
			value: "Any",
			children: "Any"
		}), Object.values(Month).map((month) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Option, {
			value: month,
			children: month
		}, month))]
	});
}
//#endregion
//#region src/components/TagFilter.tsx
function TagFilter({ value, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
		value,
		onValueChange: (v) => onSelect(v),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Option, {
			value: "Any",
			children: "Any"
		}), Object.values(Tag).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Option, {
			value: tag,
			children: TagNames[tag]
		}, tag))]
	});
}
//#endregion
//#region src/routes/transactions.tsx?tsr-split=component
function TransactionsPage() {
	const [tag, setTag] = (0, import_react.useState)("Any");
	const [category, setCategory] = (0, import_react.useState)("Any");
	const [account, setAccount] = (0, import_react.useState)("Any");
	const [month, setMonth] = (0, import_react.useState)("Any");
	const [year, setYear] = (0, import_react.useState)((/* @__PURE__ */ new Date()).getFullYear());
	const [transactions, setTransactions] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const query = {
			year,
			skipped: false,
			reviewed: true
		};
		if (month !== "Any") query.month = getMonthNumber(month);
		if (tag !== "Any") query.tag = tag;
		if (category !== "Any") query.category = category;
		if (account !== "Any") query.account = account;
		getTransactions({ data: query }).then(setTransactions);
	}, [
		month,
		year,
		tag,
		category,
		account
	]);
	const handleDelete = async (id) => {
		await deleteTransaction({ data: id });
		setTransactions((prev) => prev.filter((t) => t.id !== id));
	};
	const handleSave = (updated) => {
		setTransactions((prev) => prev.map((t) => t.id === updated.id ? updated : t));
	};
	const sorted = [...transactions].sort((a, b) => {
		if (a.month !== b.month) return a.month - b.month;
		if (a.day !== b.day) return a.day - b.day;
		return 0;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "page-full-width",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-end gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryFilter, {
					value: category,
					onSelect: setCategory
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagFilter, {
					value: tag,
					onSelect: setTag
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountFilter, {
					value: account,
					onSelect: setAccount
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthFilter, {
					value: month,
					onSelect: setMonth
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearFilter, {
					value: year,
					onSelect: setYear
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Header, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Row, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Head, { children: "Date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Head, { children: "Amount" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Head, { children: "Merchant" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Head, { children: "Category" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Head, { children: "Account" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Head, {})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Body, { children: sorted.map((transaction) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Row, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Cell, { children: [
					transaction.month,
					"/",
					transaction.day,
					"/",
					transaction.year
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: Groups[transaction.category] === Group.INCOME ? "bg-green-300" : "",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Currency, { amount: transaction.amount })
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, { children: transaction.merchant }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, { children: CategoryNames[transaction.category] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, { children: AccountNames[transaction.account] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditTransactionDialog, {
						transaction,
						onSave: handleSave
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						size: "xs",
						onClick: () => {
							if (transaction.id) handleDelete(transaction.id);
						},
						children: "Delete"
					})]
				}) })
			] }, transaction.id)) })]
		})]
	});
}
//#endregion
export { TransactionsPage as component };
