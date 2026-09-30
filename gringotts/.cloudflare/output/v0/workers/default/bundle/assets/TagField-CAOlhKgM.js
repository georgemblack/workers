import { y as __toESM } from "./createServerFn-TpCK4c9B.js";
import { a as require_react, i as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
import { a as CategoryNames, f as getProperCategory, i as Category, l as Tag, p as getProperTag, u as TagNames } from "./Types-Ci0UbdzN.js";
import { ln as resolveVariant, un as cn } from "./button-h36q7tklakhd38nx-D4x2gb7U.js";
import { t as Input } from "./input-pehjmr1q131tz38w-DsbPfrm6.js";
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/badge-xw5ydgdjx2o5qxbl.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Base styles applied to all badge variants. */
var KUMO_BADGE_BASE_STYLES = "inline-flex w-fit flex-none shrink-0 items-center justify-self-start gap-1 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap [a:hover_&]:ring [a:hover_&]:ring-current";
/** Badge variant definitions mapping variant names to their Tailwind classes and descriptions. */
var KUMO_BADGE_VARIANTS = {
	variant: {
		/** Semantic token badges */
		primary: {
			classes: "bg-kumo-badge-inverted text-kumo-badge-inverted",
			description: "Primary badge"
		},
		secondary: {
			classes: "bg-kumo-fill text-kumo-badge-neutral-subtle",
			description: "Secondary badge"
		},
		error: {
			classes: "bg-kumo-danger-tint text-kumo-danger",
			description: "Error badge"
		},
		warning: {
			classes: "bg-kumo-warning-tint text-kumo-warning",
			description: "Warning badge"
		},
		success: {
			classes: "bg-kumo-success-tint text-kumo-success",
			description: "Success badge"
		},
		destructive: {
			classes: "bg-kumo-badge-red text-white",
			description: "Deprecated. Use red instead."
		},
		info: {
			classes: "bg-kumo-info-tint text-kumo-info",
			description: "Info badge"
		},
		beta: {
			classes: "border border-dashed border-kumo-brand bg-transparent text-kumo-link",
			description: "Indicates beta or experimental features"
		},
		outline: {
			classes: "border border-kumo-fill bg-kumo-base text-kumo-default",
			description: "Bordered badge with base background"
		},
		/** Other color token variants */
		red: {
			classes: "bg-kumo-badge-red text-white",
			description: "Red badge"
		},
		green: {
			classes: "bg-kumo-badge-green text-white",
			description: "Green badge"
		},
		neutral: {
			classes: "bg-kumo-badge-neutral text-white",
			description: "Neutral badge"
		},
		orange: {
			classes: "bg-kumo-badge-orange text-black",
			description: "Orange badge"
		},
		purple: {
			classes: "bg-kumo-badge-purple text-white",
			description: "Purple badge"
		},
		teal: {
			classes: "bg-kumo-badge-teal text-white",
			description: "Teal badge"
		},
		"teal-subtle": {
			classes: "bg-kumo-badge-teal-subtle text-kumo-badge-teal-subtle",
			description: "Subtle teal badge"
		},
		blue: {
			classes: "bg-kumo-badge-blue text-white",
			description: "Blue badge"
		}
	},
	appearance: {
		filled: {
			classes: "",
			description: "Filled badge with background color (default)"
		},
		dot: {
			classes: "gap-1.5 bg-transparent text-kumo-default ring ring-kumo-hairline",
			description: "Outlined badge with a colored circle dot indicating status"
		}
	},
	dotColor: {
		none: {
			classes: "",
			description: "No dot indicator (used when appearance is not dot, or variant has no dot color)"
		},
		success: {
			classes: "bg-kumo-success",
			description: "Green dot for success status"
		},
		warning: {
			classes: "bg-kumo-badge-orange",
			description: "Orange dot for warning status"
		},
		error: {
			classes: "bg-kumo-badge-red",
			description: "Red dot for error status"
		},
		neutral: {
			classes: "bg-kumo-badge-neutral",
			description: "Neutral dot for informational status"
		}
	}
};
var KUMO_BADGE_DEFAULT_VARIANTS = {
	variant: "primary",
	appearance: "filled",
	dotColor: "none"
};
function badgeVariants({ variant = KUMO_BADGE_DEFAULT_VARIANTS.variant, appearance = KUMO_BADGE_DEFAULT_VARIANTS.appearance } = {}) {
	const variantClasses = resolveVariant(KUMO_BADGE_VARIANTS.variant, variant, KUMO_BADGE_DEFAULT_VARIANTS.variant).classes;
	const appearanceClasses = resolveVariant(KUMO_BADGE_VARIANTS.appearance, appearance, KUMO_BADGE_DEFAULT_VARIANTS.appearance).classes;
	return cn(KUMO_BADGE_BASE_STYLES, appearance === "dot" ? "" : variantClasses, appearanceClasses);
}
var renderIconNode = (IconComponent) => {
	if (!IconComponent) return null;
	const Component = IconComponent;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "flex h-lh w-3 shrink-0 items-center justify-center [&>svg]:size-3",
		children: import_react.isValidElement(IconComponent) ? IconComponent : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {})
	});
};
/**
* Small status label for categorizing or highlighting content.
*
* @example
* ```tsx
* <Badge variant="green">Active</Badge>
* <Badge variant="success" appearance="dot">Healthy</Badge>
* ```
*/
function Badge({ variant = KUMO_BADGE_DEFAULT_VARIANTS.variant, appearance = KUMO_BADGE_DEFAULT_VARIANTS.appearance, className, icon, children }) {
	const dotColor = appearance === "dot" ? resolveVariant(KUMO_BADGE_VARIANTS.dotColor, variant, KUMO_BADGE_DEFAULT_VARIANTS.dotColor).classes : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(badgeVariants({
			variant,
			appearance
		}), icon && "pl-1.5", className),
		children: [
			dotColor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: cn("size-1.75 shrink-0 rounded-full", dotColor)
			}) : null,
			renderIconNode(icon),
			children
		]
	});
}
//#endregion
//#region src/components/Autosuggest.tsx
function Autosuggest({ value, suggestions, placeholder, onChange }) {
	const consolidated = suggestions.filter((suggestion) => {
		return suggestion.toLowerCase().startsWith(value.toLowerCase());
	}).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		className: "w-full",
		placeholder,
		value,
		onChange: (e) => onChange(e.target.value),
		onKeyDown: (e) => {
			if (e.key === "ArrowRight" && consolidated.length > 0) onChange(consolidated[0]);
		}
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 flex h-8 flex-nowrap gap-1 overflow-hidden",
		children: consolidated.map((suggestion) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "cursor-pointer",
			onClick: () => onChange(suggestion),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "outline",
				children: suggestion
			})
		}, suggestion))
	})] });
}
//#endregion
//#region src/components/CategoryField.tsx
function CategoryField({ value, onSelect }) {
	const initialInput = value ? CategoryNames[value] : "";
	const [input, setInput] = (0, import_react.useState)(initialInput);
	const handleChange = (selected) => {
		setInput(selected);
		const proper = getProperCategory(selected);
		if (proper) onSelect(proper);
	};
	(0, import_react.useEffect)(() => {
		if (value) setInput(CategoryNames[value]);
		if (value === null) setInput("");
	}, [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Autosuggest, {
		value: input,
		suggestions: Object.keys(Category).map((key) => CategoryNames[key]),
		placeholder: "Category",
		onChange: handleChange
	});
}
//#endregion
//#region src/components/TagField.tsx
function TagField({ value, onSelect }) {
	const initialInput = value ? TagNames[value] : "";
	const [input, setInput] = (0, import_react.useState)(initialInput);
	const handleChange = (selected) => {
		setInput(selected);
		const proper = getProperTag(selected);
		if (proper) onSelect(proper);
	};
	(0, import_react.useEffect)(() => {
		if (value) setInput(TagNames[value]);
		if (value === null) setInput("");
	}, [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Autosuggest, {
		value: input,
		suggestions: Object.keys(Tag).map((key) => TagNames[key]),
		placeholder: "Tag",
		onChange: handleChange
	});
}
//#endregion
export { CategoryField as n, Autosuggest as r, TagField as t };
