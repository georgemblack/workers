import { y as __toESM } from "./createServerFn-TpCK4c9B.js";
import { a as require_react, i as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
import { fn as useRenderElement, hn as cn, ln as mergeProps } from "./button-hzvowfkbathmx8yg-Ddqo88Fb.js";
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useRender-h9ktka9xt4obdv6y.js
/**
* Renders a Base UI element.
*
* @public
*/
function useRender(params) {
	return useRenderElement(params.defaultTagName ?? "div", params, params);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/layer-card-lsmeuqic9i1isv2b.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var LAYER_CARD_SURFACE_CLASSES = "overflow-hidden rounded-lg bg-kumo-base shadow-xs ring ring-kumo-line";
var LAYER_CARD_LAYERED_ROOT_CLASSES = "flex w-full flex-col overflow-hidden rounded-lg bg-kumo-elevated text-base ring ring-kumo-hairline";
var LAYER_CARD_SECONDARY_CLASSES = "-my-2 flex shrink-0 items-center gap-2 bg-kumo-elevated p-4 text-base font-medium text-kumo-subtle";
var LAYER_CARD_PRIMARY_CLASSES = "relative flex shrink-0 flex-col gap-2 overflow-hidden rounded-lg bg-kumo-base p-4 pr-3 text-inherit no-underline ring ring-kumo-fill";
function layerCardVariants(_props = {}) {
	return cn(LAYER_CARD_SURFACE_CLASSES);
}
function hasLayerCardSections(children) {
	return import_react.Children.toArray(children).some((child) => {
		if (!(0, import_react.isValidElement)(child)) return false;
		if (child.type === LayerCardPrimary || child.type === LayerCardSecondary) return true;
		if (child.type === import_react.Fragment) return hasLayerCardSections(child.props.children);
		return false;
	});
}
/**
* Card container for both simple surfaces and layered layouts.
*
* Render children directly for a single-surface card, or use
* `LayerCard.Secondary` and `LayerCard.Primary` for the layered card treatment.
*
* @example
* ```tsx
* <LayerCard className="rounded-lg p-4">Card content</LayerCard>
* ```
*
* @example
* ```tsx
* <LayerCard>
*   <LayerCard.Secondary>Getting Started</LayerCard.Secondary>
*   <LayerCard.Primary>Quick start guide</LayerCard.Primary>
* </LayerCard>
* ```
*/
var LayerCardRoot = (0, import_react.forwardRef)(function LayerCard({ children, className, render, ...props }, ref) {
	const hasStructuredLayers = hasLayerCardSections(children);
	const defaultProps = { className: cn(hasStructuredLayers ? LAYER_CARD_LAYERED_ROOT_CLASSES : layerCardVariants(), className) };
	return useRender({
		defaultTagName: "div",
		render,
		ref,
		props: mergeProps(defaultProps, props, { children })
	});
});
function LayerCardSecondary({ children, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(LAYER_CARD_SECONDARY_CLASSES, className),
		...props,
		children
	});
}
function LayerCardPrimary({ children, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(LAYER_CARD_PRIMARY_CLASSES, className),
		...props,
		children
	});
}
LayerCardRoot.displayName = "LayerCard";
LayerCardSecondary.displayName = "LayerCard.Secondary";
LayerCardPrimary.displayName = "LayerCard.Primary";
var LayerCard = Object.assign(LayerCardRoot, {
	Primary: LayerCardPrimary,
	Secondary: LayerCardSecondary
});
//#endregion
export { LayerCard as t };

//# sourceMappingURL=layer-card-lsmeuqic9i1isv2b-xxG48zUo.js.map