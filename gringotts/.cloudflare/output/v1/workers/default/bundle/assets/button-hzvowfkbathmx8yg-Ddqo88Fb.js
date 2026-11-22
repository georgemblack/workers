import { y as __toESM } from "./createServerFn-TpCK4c9B.js";
import { a as require_react, i as require_jsx_runtime, n as require_with_selector, r as require_shim } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
import { t as require_react_dom } from "./react-dom-DUcgBImL.js";
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/vendor-styling-gs32v7xt5znc8kg0.js
var P = 48;
var U = (s, o = 0) => {
	const out = new Int32Array(s.length);
	for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i) - P - o;
	return out;
};
var PS = (counts) => {
	const out = new Int32Array(counts.length + 1);
	for (let i = 0; i < counts.length; i++) out[i + 1] = out[i] + counts[i];
	return out;
};
var DZ = (s) => {
	const out = new Int32Array(s.length);
	let a = 0;
	for (let i = 0; i < s.length; i++) {
		const z = s.charCodeAt(i) - P;
		a += z >>> 1 ^ -(z & 1);
		out[i] = a;
	}
	return out;
};
var GROUP_COUNT = 384;
var customValidatorNames = [];
var edgeStart = PS(U("E0500002005282000000002000150000020021820000011200000003022202000300004200120000200420001200021200301200010400162000010000220021010:2192001200220012000220012000200200200400010200040000000000400200108200110100000022010313000162002000020020012020080213000228200000000082000000000120002000120020020040101020300130001001010"));
var labelStart = PS(U(":11111111211111119311546544411119731869:671397415686432441111111111161114151214313433415:78311132233313187211117221449443411141111151152226611131111112212518142224214215421421542142424242516171151615616347111111111197911327451111111111111111111113134714133513411111311111111111111111111112444411111342312715245411117:3"));
var labelText = "@containerabcdefghinlmoprstunderlineviawzccentlignnimatespectuto-colsrowsaglorightnessckdrop-sisbcontrastfiltergrayscalehue-rotateinvertopacityslurrightnessaturateepia-coniclinearpositionradialsizeockurrderttom-belrstxyespacing-xyaretoursorlnt-umnsendspantartainentrasteividerop-shadowurationcorationlay-xyasendillexontromlter-featuresstretchapr-xyayscaleidow-colsrowsue-rotatedentlinesetvert-beringsxyeshadoweiadingftnest-clamp-imageabein-lrstxyskx--b-coniclpositionrsizet-x-y-fromto-fromto-inearfromto-fromto-adialfromto-fromtofromtofromtofromtoblockhinlinew-screenesblockhinlinewbjectpacityrutlinederigin-offsetbelrstxyesrspective-originaceholderioghtng-offsettateundedw-xyz-belrstlreseslr-endspantartaturatecepiahizekewpace-taleroll-xyz-barmpbelrstxyesbelrstxyes-thumbrackadowrink-xyxyartrokeabextora-shadowpckingnsformitionlate-xyz-offsetill-changeoom";
var edgeTarget = (() => {
	const N = edgeStart.length - 1;
	const sizes = new Int32Array(N);
	for (let i = N - 1; i >= 0; i--) {
		let s = 1;
		let c = i + 1;
		for (let k = edgeStart[i]; k < edgeStart[i + 1]; k++) {
			s += sizes[c];
			c += sizes[c];
		}
		sizes[i] = s;
	}
	const out = new Int32Array(edgeStart[N]);
	let e = 0;
	for (let i = 0; i < N; i++) {
		let c = i + 1;
		for (let k = edgeStart[i]; k < edgeStart[i + 1]; k++) {
			out[e++] = c;
			c += sizes[c];
		}
	}
	return out;
})();
var nodeGroup = U("02000000000000900<=0?000B000F00F00ŏI0J0LNPRTVX0000]_a00000000000000000000000rst0000000zŏ00000000000ŏ0000000ŏ00000000000000000000000000000000000000000000000000000000000000Ë000000000000000000000Þ000000000000000000ð0000000ø0ùúûüýþÿĀāĂăĄąĆ000000000000000000000000000000000000000000ħ0ĨĪ00000000000000000000ļĽ00000Ŭ000000", 1);
var vlistPat = PS(U("123333359346463635126536711576"));
var vlistOps = U("93203242332583253248325D>E?F@03263243255B:032523853:0325B:8GA032542H<C=12727B:0328432553;D>E?3257D>032585:0325B:;0328B:032");
var vlistRef = U("012113445661666666789111:5;;;;;;;;444;;;:62999<1161=62>>?61:21@ABCD4446996:64E:::;:?::64:F114GHHIHHHHIHH1HH1HH1HHHHHH::EEJ4444::EE4444441691;644444114244444:;K6666555555555555555999666664444444444444444444444226?6:66644L9M?D:111::::6DE199");
var vlistGroup = DZ("020200202020020020020020020020200200200200200200200002020202001003040106000200200200200200200200200200200200200200200200200200200200200200200200200200200200020020020020020020002020200202002002002002002002002002002020002002020020200220200200200200200200200200200200020020020000200020002000200200200020020020002000200200200020020202002020202000200200020022000200200020020002002000200220002002000200W0Z00020020002002020002002000200g0j0002002000200200020020002002000200200020020002000200002000002002002002002000200020000200002002002002002002002020020020200200200200200200200200202020020020020020020020020002002002020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020002002002002002002000200200200200200200200200200020202020002000200020002002002002000020200200");
var nodeVlist = (() => {
	const out = (/* @__PURE__ */ new Int32Array(319)).fill(-1);
	const A = DZ("02422242:222222242224222242442222222422222244442242226224222426222422442462222422622222222626222462242622422622422424242422222222422222222242422222222222222222622442224222222222222224424442262222222222222222222226224222424242422224422422422222");
	const V = DZ("02222222222222222222202222222222222222222222221422222222222222222222222222222222222Y\\222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222221422222222222222222222222222222222222222Ŀł222222222222222222");
	for (let i = 0; i < A.length; i++) out[A[i]] = V[i];
	return out;
})();
var SETS = "container |break-after- all auto avoid avoid-page column left page right|break-before- all auto avoid avoid-page column left page right|break-inside-a uto void void-column void-page|box-decoration- clone slice|box- border content| contents flow-root hidden table table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group| not-sr-only sr-only|float- end left none right start|clear- both end left none right start|isolat e ion-auto|overflow- auto clip hidden scroll visible|overflow-x- auto clip hidden scroll visible|overflow-y- auto clip hidden scroll visible|overscroll- auto contain none|overscroll-x- auto contain none|overscroll-y- auto contain none| absolute fixed relative static sticky| collapse invisible visible|justify- around baseline between center center-safe end end-safe evenly normal start stretch|justify-items- center center-safe end end-safe normal start stretch|justify-self- auto center center-safe end end-safe start stretch|items- baseline baseline-last center center-safe end end-safe start stretch|self- auto baseline baseline-last center center-safe end end-safe start stretch|place-content- around baseline between center center-safe end end-safe evenly start stretch|place-items- baseline center center-safe end end-safe start stretch|place-self- auto center center-safe end end-safe start stretch| antialiased subpixel-antialiased| italic not-italic|normal-nums |ordinal |slashed-zero | lining-nums oldstyle-nums| proportional-nums tabular-nums| diagonal-fractions stacked-fractions| no-underline overline| capitalize lowercase normal-case uppercase|truncate |whitespace- break-spaces normal nowrap pre pre-line pre-wrap|break- all keep normal words|wrap- anywhere break-word normal|hyphens- auto manual none|mix-blend- color color-burn color-dodge darken difference exclusion hard-light hue lighten luminosity multiply normal overlay plus-darker plus-lighter saturation screen soft-light|table- auto fixed|caption- bottom top|backface- hidden visible|appearance- auto none|scheme- dark light light-dark normal only-dark only-light|field-sizing- content fixed|pointer-events- auto none|resize  -none -x -y|snap- align-none center end start|snap- always normal|snap- both none x y|snap- mandatory proximity|touch- auto manipulation none|touch-pan- left right x|touch-pan- down up y|touch-pinch-zoom |select- all auto none text|forced-color-adjust- auto none| normal size| baseline bottom middle sub super text-bottom text-top top| bounce none ping pulse spin| auto square video| auto fr max min px|none | auto full px| fixed local scroll|clip- border content padding text|origin- border content padding| bottom bottom-left bottom-right center left left-bottom left-top right right-bottom right-top top top-left top-right| no-repeat repeat repeat-round repeat-space repeat-x repeat-y| auto contain cover| gradient-to-b gradient-to-bl gradient-to-br gradient-to-l gradient-to-r gradient-to-t gradient-to-tl gradient-to-tr none|blend- color color-burn color-dodge darken difference exclusion hard-light hue lighten luminosity multiply normal overlay saturation screen soft-light|to- b bl br l r t tl tr| auto dvh fit full lh lvh max min px screen svh| dashed dotted double hidden none solid| collapse separate|px |auto |full | content none strict| inline-size size|layout |paint |style | around baseline between center center-safe end end-safe evenly normal start stretch| alias all-scroll auto cell col-resize context-menu copy crosshair default e-resize ew-resize grab grabbing help move n-resize ne-resize nesw-resize no-drop none not-allowed ns-resize nw-resize nwse-resize pointer progress row-resize s-resize se-resize sw-resize text vertical-text w-resize wait zoom-in zoom-out| dashed dotted double solid wavy| auto from-font|reverse |initial | in in-out initial linear out| col col-reverse row row-reverse| nowrap wrap wrap-reverse| auto initial none| black bold extrabold extralight light medium normal semibold thin| condensed expanded extra-condensed extra-expanded normal semi-condensed semi-expanded ultra-condensed ultra-expanded|flow- col col-dense dense row row-dense| none subgrid| auto dvh dvw fit full lh lvh lvw max min px screen svh svw| block flex grid table| auto dvw fit full lvw max min px screen svw| loose none normal px relaxed snug tight|through |item | inside outside| decimal disc none| auto px| clip-border clip-content clip-fill clip-padding clip-stroke clip-view no-clip| add exclude intersect subtract| alpha luminance match|origin- border content fill padding stroke view|type- alpha luminance| circle ellipse| closest-corner closest-side farthest-corner farthest-side|at- bottom bottom-left bottom-right center left left-bottom left-top right right-bottom right-top top top-left top-right| dvh fit full lh lvh max min none px screen svh| auto dvh dvw fit full lh lvh lvw max min none px screen svh svw| dvw fit full lvw max min none px screen svw| auto dvh dvw fit full lvh lvw max min none prose px svh svw| auto dvh dvw fit full lvh lvw max min none px screen svh svw| contain cover fill none scale-down| first last none| distant dramatic midrange near none normal|inset | full none|3d | auto smooth|gutter- auto both stable| auto none thin| inner none| auto dvh dvw fit full lvh lvw max min px svh svw|base | center end justify left right start| clip ellipsis| balance nowrap pretty wrap| normal tight tighter wide wider widest| cpu gpu none| 3d flat| all colors none opacity shadow transform| discrete normal| full px| auto dvh dvw fit full lvh lvw max min px screen svh svw| auto contents scroll transform".split("|").map((s) => {
	const tails = s.split(" ");
	const prefix = tails.shift();
	for (let i = 0; i < tails.length; i++) tails[i] = prefix + tails[i];
	return tails;
});
var AA = DZ("0000000000000000000000000000000000000000000000000000000000000262242:6@200000006:240B428:4422400002046044222426220026642642462026224222824220022400000000\\00N222422242222222224062242222222422226264222422222222222222442804222422222222222222222222220<4<0204260002444020204224422");
var AG = DZ("ɠ222222222222222222222222222222222222222222222222222222222222˕4222226>ʶ22ʷʺʷ2ʸʷ42ʴ2ʓ22>621422ɶ222ɹɼɷɺɷɺ22ɱ42222ɨ2ɧ26622ɘɓ244ƸƵ222]d24242ǖǓƚÄȫ2263ȨȥȨ2222222ǣ222222222222222222ǂƽ2ƾƵ2222222422222ƜƑ22222222222222222222144Ŧţ22Ţş222222222222222222222ĸ2ı68ĦģĦɡŰ4Ġ«®ĝ822ĔđĔ2ē2222622");
var AS = DZ("02222222222222222222222222222222222222222222222222222222222222222202022222222222EH2200IL021042222Y\\222IL0cf2e10j2222U00X202[^2y0000120|{~22:22|22222222222G000qOVI00000}2>40000B00000I¨©000¬00000000000000021M®­00°000000000000000000000222HGHa1º222¿2À2222ÉÌ000­°2±");
var litAnchor = /* @__PURE__ */ new Int32Array(995);
var litGroup = /* @__PURE__ */ new Int32Array(995);
var litPool = /* @__PURE__ */ new Int32Array(995);
var poolText = "";
var poolOffsets = /* @__PURE__ */ new Int32Array(1038);
{
	const tailRef = /* @__PURE__ */ new Map();
	let nextRef = 0;
	let e = 0;
	for (let i = 0; i < AA.length; i++) for (const tail of SETS[AS[i]]) {
		let r = tailRef.get(tail);
		if (r === void 0) {
			r = nextRef++;
			tailRef.set(tail, r);
			poolOffsets[r * 2] = poolText.length;
			poolOffsets[r * 2 + 1] = tail.length;
			poolText += tail;
		}
		litAnchor[e] = AA[i];
		litGroup[e] = AG[i];
		litPool[e] = r;
		e++;
	}
}
var adjGid = DZ("0b2N:222@R>F@286¦2@H2D266226FB22B2>BD\\6N22222Z222D222p");
var adjStart = PS(U("1::24444432:442:44:44>222222:44:4421322511111311111114"));
var adjTgt = DZ("24A;33N=C@H4A;33N=C@<27;83:;8393NQ:3NQʰ222ˉºŴŽ2R2=18cƴÅŇ=cĞÛC1ƈǝȈ:ħ25=11D3A@4=<1;1DEr25;11B3?<6;:371BCn9@7=<8192>2E121@9@EHE@9>2T25511<398454131<=V25511<398454131<=ƧNž2Đå242L222290000f22500ɛ000ǘ222");
var patGid = U("ĳ");
var patTgt = U("");
var postfixLookupGroups = U("1");
var tables_generated_default = {
	GROUP_COUNT,
	customValidatorNames,
	edgeStart,
	labelStart,
	labelText,
	edgeTarget,
	nodeGroup,
	nodeVlist,
	vlistPat,
	vlistOps,
	vlistRef,
	vlistGroup,
	litAnchor,
	litGroup,
	litPool,
	poolOffsets,
	poolText,
	adjGid,
	adjStart,
	adjTgt,
	patGid,
	patTgt,
	postfixLookupGroups,
	orderSensitiveModifiers: "* ** after backdrop before details-content file first-letter first-line marker placeholder selection"
};
var IS_JSC = "line" in /* @__PURE__ */ new Error();
var EXTERNAL = -1;
var DEAD = -1;
var fnv = (str, s, e) => {
	let h = 2166136261;
	for (let p = s; p < e; p++) h = Math.imul(h ^ str.charCodeAt(p), 16777619);
	return h;
};
var spanHash = (str, s, e) => {
	const len = e - s;
	let h = Math.imul(len, 2654435761) ^ str.charCodeAt(s);
	if (len > 3) {
		const q = len >> 2;
		const m = len >> 1;
		h = Math.imul(h ^ str.charCodeAt(s + 1) << 8 ^ str.charCodeAt(s + 2) << 16 ^ str.charCodeAt(s + q), 2246822507);
		h = Math.imul(h ^ str.charCodeAt(s + m) << 8 ^ str.charCodeAt(s + m + q) << 16 ^ str.charCodeAt(e - 3), 3266489909);
		h ^= str.charCodeAt(e - 2) << 8 ^ str.charCodeAt(e - 1) << 16;
		for (let p = s + 3, q = e - 4; p < s + 8 && p < q; p++, q--) h = Math.imul(h ^ str.charCodeAt(p) ^ str.charCodeAt(q) << 8, 16777619);
	}
	return h ^ h >>> 15 | 0;
};
var createEngine = (T, validatorImpls, options = {}) => {
	const { GROUP_COUNT, edgeStart, labelStart, labelText, edgeTarget, nodeGroup, nodeVlist, vlistPat, vlistOps, vlistRef, vlistGroup, litAnchor, litGroup, litPool, poolOffsets, poolText, adjGid, adjStart, adjTgt, patGid, patTgt, postfixLookupGroups, customValidatorNames, orderSensitiveModifiers } = T;
	const adjRow = new Int32Array(GROUP_COUNT).fill(-1);
	for (let i = 0; i < adjGid.length; i++) adjRow[adjGid[i]] = i;
	let maxAdj = 0;
	for (let r = 0; r + 1 < adjStart.length; r++) {
		const n = adjStart[r + 1] - adjStart[r];
		if (n > maxAdj) maxAdj = n;
	}
	let CLAIM_PER_TOKEN = 32;
	while (CLAIM_PER_TOKEN < 2 * (1 + maxAdj + patGid.length)) CLAIM_PER_TOKEN <<= 1;
	const vgStart = new Int32Array(vlistRef.length + 1);
	for (let l = 0; l < vlistRef.length; l++) vgStart[l + 1] = vgStart[l] + vlistPat[vlistRef[l] + 1] - vlistPat[vlistRef[l]];
	const postfixLookupSet = new Uint8Array(GROUP_COUNT);
	for (let i = 0; i < postfixLookupGroups.length; i++) postfixLookupSet[postfixLookupGroups[i]] = 1;
	const nodeCount = edgeStart.length - 1;
	const nodeHasLit = new Uint8Array(nodeCount);
	let litMaxLen = 0;
	let litNoArb = true;
	for (let i = 0; i < litAnchor.length; i++) {
		nodeHasLit[litAnchor[i]] = 1;
		const len = poolOffsets[litPool[i] * 2 + 1];
		if (len > litMaxLen) litMaxLen = len;
		const c0 = poolText.charCodeAt(poolOffsets[litPool[i] * 2]);
		if (c0 === 91 || c0 === 40) litNoArb = false;
	}
	let LIT_SIZE = 1;
	while (LIT_SIZE < litAnchor.length * 2) LIT_SIZE <<= 1;
	const litTable = new Int32Array(LIT_SIZE).fill(-1);
	for (let i = 0; i < litAnchor.length; i++) {
		const off = poolOffsets[litPool[i] * 2];
		let idx = (fnv(poolText, off, off + poolOffsets[litPool[i] * 2 + 1]) ^ Math.imul(litAnchor[i], 2654435761) | 0) & LIT_SIZE - 1;
		while (litTable[idx] !== -1) idx = idx + 1 & LIT_SIZE - 1;
		litTable[idx] = i;
	}
	const litProbe = (anchor, input, s, e) => {
		let idx = (fnv(input, s, e) ^ Math.imul(anchor, 2654435761) | 0) & LIT_SIZE - 1;
		const len = e - s;
		for (;;) {
			const entry = litTable[idx];
			if (entry === -1) return -1;
			if (litAnchor[entry] === anchor && poolOffsets[litPool[entry] * 2 + 1] === len) {
				const off = poolOffsets[litPool[entry] * 2];
				let ok = true;
				for (let k = 0; k < len; k++) if (poolText.charCodeAt(off + k) !== input.charCodeAt(s + k)) {
					ok = false;
					break;
				}
				if (ok) return litGroup[entry];
			}
			idx = idx + 1 & LIT_SIZE - 1;
		}
	};
	const cacheSize = options.cacheSize ?? 8192;
	const RAW_PREFIX = options.prefix ?? T.prefix ?? "";
	const FULL_PREFIX = RAW_PREFIX === "" ? "" : RAW_PREFIX + ":";
	const FPL = FULL_PREFIX.length;
	const vCustom = (customValidatorNames ?? []).map((name) => {
		const fn = validatorImpls && validatorImpls[name];
		if (!fn) throw new Error("cn: missing validator " + name);
		return fn;
	});
	const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
	const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
	const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
	const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
	let aKind = 0;
	let aLabelS = -1;
	let aLabelE = -1;
	let aValS = -1;
	let aValE = -1;
	const isWordCode = (c) => c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c === 95;
	const isUniWS = (c) => /\s/.test(String.fromCharCode(c));
	const analyzeArb = (input, s, e) => {
		aKind = 0;
		aLabelS = -1;
		if (e - s < 3) return;
		const c0 = input.charCodeAt(s);
		const cl = input.charCodeAt(e - 1);
		if (c0 === 91 && cl === 93) aKind = 1;
		else if (c0 === 40 && cl === 41) aKind = 2;
		else return;
		aValS = s + 1;
		aValE = e - 1;
		let p = s + 1;
		if (isWordCode(input.charCodeAt(p))) {
			p++;
			while (p < e - 1) {
				const c = input.charCodeAt(p);
				if (!isWordCode(c) && c !== 45) break;
				p++;
			}
			if (p < e - 2 && input.charCodeAt(p) === 58) {
				aLabelS = s + 1;
				aLabelE = p;
				aValS = p + 1;
			}
		}
	};
	const spanEq = (input, s, e, str) => {
		if (e - s !== str.length) return false;
		for (let i = 0; i < str.length; i++) if (input.charCodeAt(s + i) !== str.charCodeAt(i)) return false;
		return true;
	};
	const fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
	const tshirtRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
	const isNumStr = (v) => !!v && !Number.isNaN(Number(v));
	const spanIsNamedContainerQuery = (input, s, e) => {
		if (e - s < 11 || !spanEq(input, s, s + 10, "@container")) return false;
		if (input.charCodeAt(s + 10) === 47) return e - s >= 12;
		const c11 = input.charCodeAt(s + 11);
		return c11 === 115 && e - s >= 17 && spanEq(input, s + 10, s + 16, "-size/") || c11 === 110 && e - s >= 19 && spanEq(input, s + 10, s + 18, "-normal/");
	};
	const VKIND = [
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		2,
		2,
		2,
		2,
		2,
		2,
		2
	];
	const VLABELS = "length|number|number weight|family-name|position percentage|length size bg-size|image url|shadow|length|family-name|position percentage|length size bg-size|image url|shadow|number weight".split("|").map((s) => s.split(" "));
	const VFALL = [
		2,
		3,
		1,
		0,
		0,
		0,
		4,
		5,
		0,
		0,
		0,
		0,
		0,
		1,
		1
	];
	const runValidator = (op, input, s, e) => {
		if (op >= 10) {
			if (op >= 25) return vCustom[op - 25](input.slice(s, e));
			const i = op - 10;
			if (aKind !== VKIND[i]) return false;
			if (aLabelS >= 0) {
				for (const L of VLABELS[i]) if (spanEq(input, aLabelS, aLabelE, L)) return true;
				return false;
			}
			switch (VFALL[i]) {
				case 0: return false;
				case 1: return true;
				case 2: {
					const v = input.slice(aValS, aValE);
					return lengthUnitRegex.test(v) && !colorFunctionRegex.test(v);
				}
				case 3: return isNumStr(input.slice(aValS, aValE));
				case 4: return imageRegex.test(input.slice(aValS, aValE));
				default: return shadowRegex.test(input.slice(aValS, aValE));
			}
		}
		switch (op) {
			case 0: return true;
			case 1: return aKind === 0;
			case 2: return aKind === 1;
			case 3: return aKind === 2;
			case 4: return fractionRegex.test(input.slice(s, e));
			case 5: return isNumStr(input.slice(s, e));
			case 6: {
				const v = input.slice(s, e);
				return !!v && Number.isInteger(Number(v));
			}
			case 7: return e > s && input.charCodeAt(e - 1) === 37 && isNumStr(input.slice(s, e - 1));
			case 8: return tshirtRegex.test(input.slice(s, e));
			default: return spanIsNamedContainerQuery(input, s, e);
		}
	};
	const orderSensitive = new Set(typeof orderSensitiveModifiers === "string" ? orderSensitiveModifiers.split(" ") : orderSensitiveModifiers);
	const internSpan = (map, input, s, e, imp, make) => {
		const h = fnv(input, s, e) ^ (imp ? 2654435769 : 0) | 0;
		let bucket = map.get(h);
		if (bucket !== void 0) outer: for (let b = 0; b < bucket.length; b++) {
			const en = bucket[b];
			if (en.imp !== imp || en.k.length !== e - s) continue;
			for (let i = 0; i < en.k.length; i++) if (en.k.charCodeAt(i) !== input.charCodeAt(s + i)) continue outer;
			return en.id;
		}
		else map.set(h, bucket = []);
		const k = input.slice(s, e);
		const id = make(k);
		bucket.push({
			k,
			imp,
			id
		});
		return id;
	};
	let ctxByHash = /* @__PURE__ */ new Map();
	let ctxByCanon = /* @__PURE__ */ new Map();
	let nextCtxId = 2;
	const MAX_CTX = 4096;
	const canonicalizeContext = (raw, important) => {
		const mods = [];
		let dB = 0, dP = 0, start = 0;
		for (let i = 0; i < raw.length; i++) {
			const c = raw.charCodeAt(i);
			if (dB === 0 && dP === 0 && c === 58) {
				mods.push(raw.slice(start, i));
				start = i + 1;
			} else if (c === 91) dB++;
			else if (c === 93) dB--;
			else if (c === 40) dP++;
			else if (c === 41) dP--;
		}
		mods.push(raw.slice(start));
		let canonical = mods[0];
		if (mods.length > 1) {
			const result = [];
			let segment = [];
			for (const mod of mods) if (mod.charCodeAt(0) === 91 || orderSensitive.has(mod)) {
				if (segment.length) {
					result.push(...segment.sort());
					segment = [];
				}
				result.push(mod);
			} else segment.push(mod);
			if (segment.length) result.push(...segment.sort());
			canonical = result.join(":");
		}
		const key = important ? canonical + " !" : canonical;
		let id = ctxByCanon.get(key);
		if (id === void 0) ctxByCanon.set(key, id = nextCtxId++);
		return id;
	};
	let dynByHash = /* @__PURE__ */ new Map();
	let nextDynId = GROUP_COUNT;
	const MAX_DYN = GROUP_COUNT + 4096;
	const newDynId = () => nextDynId++;
	const ID_LIMIT = 2097152;
	const TOKEN_TABLE = 8192;
	const memoHash = new Int32Array(TOKEN_TABLE);
	const memoStr = new Array(TOKEN_TABLE).fill(null);
	const memoGid = new Int32Array(TOKEN_TABLE);
	const memoCtx = new Int32Array(TOKEN_TABLE);
	const memoFlags = new Uint8Array(TOKEN_TABLE);
	let memoTick = 0;
	const memoPut = (way0, input, ts, te, h, gid, ctxId, flags) => {
		let slot = way0;
		if (memoStr[way0] !== null) if (memoStr[way0 | 1] === null) slot = way0 | 1;
		else if ((memoTick++ & 3) === 0) slot = way0 | memoTick >> 2 & 1;
		else return;
		memoStr[slot] = input.slice(ts, te);
		memoHash[slot] = h;
		memoGid[slot] = gid;
		memoCtx[slot] = ctxId;
		memoFlags[slot] = flags;
	};
	const memoReset = () => memoStr.fill(null);
	let cap = 256;
	let tokI32 = [
		new Int32Array(cap),
		new Int32Array(cap),
		new Int32Array(cap),
		new Int32Array(cap)
	];
	let [tokStart, tokEnd, tokGid, tokCtx] = tokI32;
	let tokFlags = new Uint8Array(cap);
	let keep = new Uint8Array(cap);
	const growTokens = () => {
		cap *= 2;
		tokI32 = tokI32.map((a) => {
			const n = new Int32Array(cap);
			n.set(a);
			return n;
		});
		[tokStart, tokEnd, tokGid, tokCtx] = tokI32;
		const nf = new Uint8Array(cap);
		nf.set(tokFlags);
		tokFlags = nf;
		keep = new Uint8Array(cap);
	};
	let ckptCap = 64;
	let ckptNode = new Int32Array(ckptCap);
	let ckptTail = new Int32Array(ckptCap);
	const claim0 = new Int32Array(GROUP_COUNT);
	let CLAIM_TABLE = 2048;
	let claimShift = 21;
	let claimKeys = new Float64Array(CLAIM_TABLE);
	let claimEpochs = new Int32Array(CLAIM_TABLE);
	let epoch = 0;
	const claimTest = (ctx, gid) => {
		if (ctx === 0 && gid < GROUP_COUNT) {
			if (claim0[gid] === epoch) return 1;
			claim0[gid] = epoch;
			return 0;
		}
		const key = ctx * 2097152 + gid + 1;
		let idx = Math.imul(key, 2654435761) >>> claimShift;
		for (;;) {
			if (claimEpochs[idx] !== epoch) break;
			if (claimKeys[idx] === key) return 1;
			idx = idx + 1 & CLAIM_TABLE - 1;
		}
		claimKeys[idx] = key;
		claimEpochs[idx] = epoch;
		return 0;
	};
	const resolveAt = (input, bs, endPos, nodeAt, ckptAt) => {
		if (endPos - bs >= 2 && input.charCodeAt(bs) === 91 && input.charCodeAt(endPos - 1) === 93) {
			let colon = -1;
			for (let p = bs + 1; p < endPos - 1; p++) if (input.charCodeAt(p) === 58) {
				colon = p;
				break;
			}
			if (colon === -1 || colon === bs + 1) return EXTERNAL;
			return internSpan(dynByHash, input, bs + 1, colon, 0, newDynId);
		}
		if (nodeAt >= 0 && nodeGroup[nodeAt] >= 0) return nodeGroup[nodeAt];
		for (let k = ckptAt - 1; k >= 0; k--) {
			const tailStart = ckptTail[k];
			if (tailStart > endPos) continue;
			const nodeId = ckptNode[k];
			const tlen = endPos - tailStart;
			if (nodeHasLit[nodeId] === 1 && tlen > 0 && tlen <= litMaxLen) {
				const c0 = input.charCodeAt(tailStart);
				if (litNoArb === false || c0 !== 91 && c0 !== 40) {
					const g = litProbe(nodeId, input, tailStart, endPos);
					if (g >= 0) return g;
				}
			}
			const vl = nodeVlist[nodeId];
			if (vl < 0) continue;
			const pat = vlistRef[vl];
			const vs = vlistPat[pat];
			const ve = vlistPat[pat + 1];
			if (vs === ve) continue;
			analyzeArb(input, tailStart, endPos);
			const g0 = vgStart[vl] - vs;
			for (let v = vs; v < ve; v++) if (runValidator(vlistOps[v], input, tailStart, endPos)) return vlistGroup[g0 + v];
		}
		return EXTERNAL;
	};
	const mergeClassList = (input) => {
		const n = input.length;
		let tokenCount = 0;
		let totalTokenChars = 0;
		let sawNonSpaceWS = false;
		if (nextCtxId > MAX_CTX || ctxByHash.size > MAX_CTX) {
			ctxByHash = /* @__PURE__ */ new Map();
			ctxByCanon = /* @__PURE__ */ new Map();
			nextCtxId = 2;
			memoReset();
		}
		if (nextDynId > MAX_DYN) {
			dynByHash = /* @__PURE__ */ new Map();
			nextDynId = GROUP_COUNT;
			memoReset();
		}
		let i = 0;
		while (i < n) {
			let c = input.charCodeAt(i);
			if (c === 32 || c >= 9 && c <= 13 || c >= 160 && isUniWS(c)) {
				if (c !== 32) sawNonSpaceWS = true;
				i++;
				continue;
			}
			const ts = i;
			let th = 0;
			while (i < n) {
				c = input.charCodeAt(i);
				if (c <= 32) {
					if (c === 32) break;
					if (c >= 9 && c <= 13) {
						sawNonSpaceWS = true;
						break;
					}
				} else if (c >= 160 && isUniWS(c)) {
					sawNonSpaceWS = true;
					break;
				}
				th = Math.imul(th ^ c, 16777619);
				i++;
			}
			const te = i;
			const len = te - ts;
			if (tokenCount === cap) growTokens();
			const t = tokenCount++;
			tokStart[t] = ts;
			tokEnd[t] = te;
			totalTokenChars += len;
			th ^= Math.imul(len, 2654435761);
			const h = th ^ th >>> 15 | 0;
			const way0 = h & 8190;
			{
				let hitAt = -1;
				if (memoHash[way0] === h && memoStr[way0] !== null && memoStr[way0].length === len) hitAt = way0;
				else if (memoHash[way0 | 1] === h && memoStr[way0 | 1] !== null && memoStr[way0 | 1].length === len) hitAt = way0 | 1;
				if (hitAt >= 0) {
					const s = memoStr[hitAt];
					let ok = true;
					for (let k = 0; k < len; k++) if (s.charCodeAt(k) !== input.charCodeAt(ts + k)) {
						ok = false;
						break;
					}
					if (ok) {
						tokGid[t] = memoGid[hitAt];
						tokCtx[t] = memoCtx[hitAt];
						tokFlags[t] = memoFlags[hitAt];
						continue;
					}
				}
			}
			let pts = ts;
			if (FPL !== 0) {
				if (te - ts <= FPL || !input.startsWith(FULL_PREFIX, ts)) {
					tokGid[t] = EXTERNAL;
					memoPut(way0, input, ts, te, h, EXTERNAL, 0, 0);
					continue;
				}
				pts = ts + FPL;
			}
			let depthB = 0, depthP = 0;
			let lastColon = -1, lastSlash = -1;
			for (let p = pts; p < te; p++) {
				const pc = input.charCodeAt(p);
				if (depthB === 0 && depthP === 0) {
					if (pc === 58) {
						lastColon = p;
						continue;
					}
					if (pc === 47) {
						lastSlash = p;
						continue;
					}
				}
				if (pc === 91) depthB++;
				else if (pc === 93) depthB--;
				else if (pc === 40) depthP++;
				else if (pc === 41) depthP--;
			}
			const modStart = lastColon >= pts ? lastColon + 1 : pts;
			let bs = modStart;
			let be = te;
			let important = false;
			let prefixShift = 0;
			if (be > bs && input.charCodeAt(be - 1) === 33) {
				important = true;
				be--;
			} else if (be > bs && input.charCodeAt(bs) === 33) {
				important = true;
				bs++;
				prefixShift = 1;
			}
			let postfixEnd = -1;
			if (lastSlash > modStart) {
				postfixEnd = lastSlash + prefixShift;
				if (postfixEnd >= be) postfixEnd = -1;
			}
			let feedStart = bs;
			if (be - bs > 1 && input.charCodeAt(bs) === 45) feedStart = bs + 1;
			let node = 0;
			let lp = 0;
			let le = 0;
			let pending = -1;
			let ckptTop = 0;
			if (nodeVlist[0] >= 0 || nodeHasLit[0] === 1) {
				ckptNode[0] = 0;
				ckptTail[0] = feedStart;
				ckptTop = 1;
			}
			let slashNode = DEAD;
			let slashCkpt = 0;
			for (let p = feedStart; p < be; p++) {
				if (p === postfixEnd) {
					slashNode = lp < le ? DEAD : node;
					slashCkpt = ckptTop;
				}
				if (node !== DEAD) {
					const cc = input.charCodeAt(p);
					let arrived = -1;
					if (lp < le) if (labelText.charCodeAt(lp) === cc) {
						lp++;
						if (lp === le) arrived = node = pending;
					} else node = DEAD;
					else {
						const es = edgeStart[node];
						const ee = edgeStart[node + 1];
						let next = DEAD;
						for (let e = es; e < ee; e++) {
							const ls = labelStart[e];
							if (labelText.charCodeAt(ls) === cc) {
								if (labelStart[e + 1] - ls === 1) arrived = next = edgeTarget[e];
								else {
									lp = ls + 1;
									le = labelStart[e + 1];
									pending = edgeTarget[e];
									next = node;
								}
								break;
							}
						}
						node = next;
					}
					if (arrived >= 0 && (nodeVlist[arrived] >= 0 || nodeHasLit[arrived] === 1) && p + 1 < be && input.charCodeAt(p + 1) === 45) {
						if (ckptTop === ckptCap) {
							ckptCap *= 2;
							const nv = new Int32Array(ckptCap);
							nv.set(ckptNode);
							ckptNode = nv;
							const nt = new Int32Array(ckptCap);
							nt.set(ckptTail);
							ckptTail = nt;
						}
						ckptNode[ckptTop] = arrived;
						ckptTail[ckptTop] = p + 2;
						ckptTop++;
					}
				}
			}
			if (postfixEnd === be) {
				slashNode = lp < le ? DEAD : node;
				slashCkpt = ckptTop;
			}
			const endNode = lp < le ? DEAD : node;
			let gid;
			let hasPostfix = false;
			if (postfixEnd >= 0) {
				hasPostfix = true;
				gid = resolveAt(input, bs, postfixEnd, slashNode, slashCkpt);
				if (gid !== EXTERNAL && gid < GROUP_COUNT && postfixLookupSet[gid]) {
					const gidFull = resolveAt(input, bs, be, endNode, ckptTop);
					if (gidFull !== EXTERNAL && gidFull !== gid) {
						gid = gidFull;
						hasPostfix = false;
					}
				} else if (gid === EXTERNAL) {
					gid = resolveAt(input, bs, be, endNode, ckptTop);
					hasPostfix = false;
				}
			} else gid = resolveAt(input, bs, be, endNode, ckptTop);
			let ctxId = 0;
			let flags = 0;
			if (gid === EXTERNAL) tokGid[t] = EXTERNAL;
			else {
				flags = hasPostfix ? 1 : 0;
				ctxId = pts >= lastColon ? important ? 1 : 0 : internSpan(ctxByHash, input, pts, lastColon, important ? 1 : 0, (k) => canonicalizeContext(k, important));
				tokGid[t] = gid;
				tokFlags[t] = flags;
				tokCtx[t] = ctxId;
			}
			memoPut(way0, input, ts, te, h, gid, ctxId, flags);
		}
		if (tokenCount === 0) return "";
		if (tokenCount === 1) return tokStart[0] === 0 && tokEnd[0] === n ? input : input.slice(tokStart[0], tokEnd[0]);
		if (tokenCount * CLAIM_PER_TOKEN > CLAIM_TABLE) {
			while (tokenCount * CLAIM_PER_TOKEN > CLAIM_TABLE) {
				CLAIM_TABLE <<= 1;
				claimShift--;
			}
			claimKeys = new Float64Array(CLAIM_TABLE);
			claimEpochs = new Int32Array(CLAIM_TABLE);
		}
		if (nextCtxId >= ID_LIMIT || nextDynId >= ID_LIMIT) throw new Error("cn: too many distinct classes in one merge");
		epoch = epoch + 1 | 0;
		if (epoch === 0) {
			claim0.fill(0);
			claimEpochs.fill(0);
			epoch = 1;
		}
		let didDrop = false;
		for (let t = tokenCount - 1; t >= 0; t--) {
			const gid = tokGid[t];
			if (gid === EXTERNAL) {
				keep[t] = 1;
				continue;
			}
			const ctxId = tokCtx[t];
			if (claimTest(ctxId, gid) === 1) {
				keep[t] = 0;
				didDrop = true;
				continue;
			}
			keep[t] = 1;
			if (gid < GROUP_COUNT) {
				const r = adjRow[gid];
				if (r >= 0) for (let k = adjStart[r]; k < adjStart[r + 1]; k++) claimTest(ctxId, adjTgt[k]);
				if (tokFlags[t] & 1) {
					for (let k = 0; k < patGid.length; k++) if (patGid[k] === gid) claimTest(ctxId, patTgt[k]);
				}
			}
		}
		if (!didDrop && !sawNonSpaceWS && n === totalTokenChars + tokenCount - 1) return input;
		let out = "";
		let t = 0;
		while (t < tokenCount) {
			if (!keep[t]) {
				t++;
				continue;
			}
			const runStart = tokStart[t];
			let runEnd = tokEnd[t];
			let u = t + 1;
			while (u < tokenCount && keep[u] && tokStart[u] === runEnd + 1 && input.charCodeAt(runEnd) === 32) {
				runEnd = tokEnd[u];
				u++;
			}
			if (out.length > 0) out += " ";
			out += input.slice(runStart, runEnd);
			t = u;
		}
		return out;
	};
	const DOOR_SIZE = 16384;
	const door = new Int32Array(DOOR_SIZE * 2);
	let doorBase = 0;
	let doorEpoch = 1;
	let cache = Object.create(null);
	let prevCache = Object.create(null);
	let cacheMap = /* @__PURE__ */ new Map();
	let prevCacheMap = /* @__PURE__ */ new Map();
	let cacheCount = 0;
	let doorMarks = 0;
	const rotateDoor = () => {
		doorBase ^= DOOR_SIZE;
		doorEpoch = doorEpoch + 1 | 0;
		doorMarks = 0;
	};
	const mergeCached = (input) => {
		let merged = cache[input];
		if (merged !== void 0) return merged;
		const hash = spanHash(input, 0, input.length);
		const slot = (hash & 16383) + doorBase;
		const wasSeen = door[slot] === (hash ^ doorEpoch) || door[slot ^ DOOR_SIZE] === (hash ^ doorEpoch - 1);
		if (wasSeen) {
			merged = prevCache[input];
			if (merged !== void 0) {
				cache[input] = merged;
				return merged;
			}
		}
		merged = mergeClassList(input);
		if (wasSeen) {
			cache[input] = merged;
			if (++cacheCount > cacheSize) {
				cacheCount = 0;
				prevCache = cache;
				cache = Object.create(null);
				rotateDoor();
			}
		} else {
			door[slot] = hash ^ doorEpoch;
			if (++doorMarks > DOOR_SIZE) rotateDoor();
		}
		return merged;
	};
	const mergeCachedMap = (input) => {
		let merged = cacheMap.get(input);
		if (merged !== void 0) return merged;
		const hash = spanHash(input, 0, input.length);
		const slot = (hash & 16383) + doorBase;
		const wasSeen = door[slot] === (hash ^ doorEpoch) || door[slot ^ DOOR_SIZE] === (hash ^ doorEpoch - 1);
		if (wasSeen) {
			merged = prevCacheMap.get(input);
			if (merged !== void 0) {
				cacheMap.set(input, merged);
				return merged;
			}
		}
		merged = mergeClassList(input);
		if (wasSeen) {
			cacheMap.set(input, merged);
			if (++cacheCount > cacheSize) {
				cacheCount = 0;
				prevCacheMap = cacheMap;
				cacheMap = /* @__PURE__ */ new Map();
				rotateDoor();
			}
		} else {
			door[slot] = hash ^ doorEpoch;
			if (++doorMarks > DOOR_SIZE) rotateDoor();
		}
		return merged;
	};
	const seenBefore = (input) => {
		const hash = spanHash(input, 0, input.length);
		const slot = (hash & 16383) + doorBase;
		if (door[slot] === (hash ^ doorEpoch) || door[slot ^ DOOR_SIZE] === (hash ^ doorEpoch - 1)) return true;
		door[slot] = hash ^ doorEpoch;
		if (++doorMarks > DOOR_SIZE) rotateDoor();
		return false;
	};
	const mergeString = cacheSize === 0 ? mergeClassList : IS_JSC ? (input) => {
		const merged = cacheMap.get(input);
		return merged !== void 0 ? merged : mergeCachedMap(input);
	} : mergeCached;
	const merge = function() {
		return arguments.length === 1 && typeof arguments[0] === "string" ? mergeString(arguments[0]) : mergeString(twJoin.apply(null, arguments));
	};
	return {
		merge,
		mergeString,
		seenBefore: cacheSize === 0 ? () => false : seenBefore,
		mergeUncached: mergeClassList
	};
};
var resolveValue$1 = (v, clsxMode) => {
	if (!v) return "";
	if (typeof v === "string") return v;
	let out = "";
	if (typeof v.length === "number" && (clsxMode ? Array.isArray(v) : true)) {
		const arr = v;
		for (let i = 0; i < arr.length; i++) {
			const item = arr[i];
			if (!item) continue;
			const r = typeof item === "string" ? item : resolveValue$1(item, clsxMode);
			if (r) {
				if (out) out += " ";
				out += r;
			}
		}
		return out;
	}
	if (clsxMode) {
		if (typeof v === "number") return "" + v;
		if (typeof v === "object") {
			for (const k in v) if (v[k]) {
				if (out) out += " ";
				out += k;
			}
		}
	}
	return out;
};
var joinArgs = (args, clsxMode) => {
	let s = "";
	for (let i = 0; i < args.length; i++) {
		const a = args[i];
		if (!a) continue;
		const r = typeof a === "string" ? a : resolveValue$1(a, clsxMode);
		if (r) {
			if (s) s += " ";
			s += r;
		}
	}
	return s;
};
/** join-only, `twJoin`-compatible (strings + nested arrays, falsy skipped) */
var twJoin = function() {
	return joinArgs(arguments, false);
};
var BUCKET_CAP = 256;
var BUCKET_MISS_CAP = 16;
var BUCKET_SKIP = 1024;
var CHURN_SIZE = 4096;
var wrapClsx = (mergeString, fresh) => {
	const seenBefore = fresh === void 0 ? () => true : fresh.seenBefore;
	const mergeUncached = fresh === void 0 ? mergeString : fresh.mergeUncached;
	let argCache = /* @__PURE__ */ new Map();
	let prevArgCache = /* @__PURE__ */ new Map();
	let argCount = 0;
	let lastHit = null;
	let churnKey = null;
	let churnOwn = [];
	let churnVal = [];
	let churnTick = 0;
	const churnLookup = (key, own, join) => {
		if (churnKey === null) {
			churnKey = new Array(CHURN_SIZE).fill("");
			churnOwn = new Array(CHURN_SIZE).fill("");
			churnVal = new Array(CHURN_SIZE).fill("");
		}
		const way0 = spanHash(key, 0, key.length) & 4094;
		if (churnKey[way0] === key && churnOwn[way0] === own) return churnVal[way0];
		if (churnKey[way0 | 1] === key && churnOwn[way0 | 1] === own) return churnVal[way0 | 1];
		const merged = mergeString(join ? own + " " + key : key);
		const slot = churnKey[way0] === "" ? way0 : way0 | (churnKey[way0 | 1] === "" ? 1 : churnTick++ & 1);
		churnKey[slot] = key;
		churnOwn[slot] = own;
		churnVal[slot] = merged;
		return merged;
	};
	const match3 = (e, v0, v1, v2) => {
		let k = 0;
		if (v0) {
			if (v0 !== e.a0) return false;
			k = 1;
		}
		if (v1) {
			if (v1 !== (k === 0 ? e.a0 : e.a1)) return false;
			k++;
		}
		if (v2) {
			if (v2 !== (k === 0 ? e.a0 : k === 1 ? e.a1 : e.a2)) return false;
			k++;
		}
		return k === e.t;
	};
	const matchN = (e, vals) => {
		const ea = e.a;
		let k = 0;
		for (let i = 0; i < vals.length; i++) {
			const v = vals[i];
			if (!v) continue;
			if (v !== ea[k]) return false;
			k++;
		}
		return k === e.t;
	};
	const resolveArgs = (vals, probed) => {
		const nArgs = vals.length;
		const pred = lastHit === null ? null : lastHit.n;
		if (!probed) {
			if (pred !== null && matchN(pred, vals)) {
				lastHit = pred;
				return pred.r;
			}
			if (lastHit !== null && lastHit !== pred && matchN(lastHit, vals)) return lastHit.r;
		}
		let first = "";
		let firstIdx = -1;
		let truthy = 0;
		let hasResolvedValue = false;
		for (let i = 0; i < nArgs; i++) {
			let v = vals[i];
			if (!v) continue;
			if (typeof v !== "string") {
				v = vals[i] = resolveValue$1(v, true);
				if (!v) continue;
				hasResolvedValue = true;
			}
			if (firstIdx < 0) {
				first = v;
				firstIdx = i;
			}
			truthy++;
		}
		if (truthy === 0) return "";
		if (truthy === 1) return mergeString(first);
		if (hasResolvedValue) {
			if (pred !== null && matchN(pred, vals)) {
				lastHit = pred;
				return pred.r;
			}
			if (lastHit !== null && lastHit !== pred && matchN(lastHit, vals)) return lastHit.r;
		}
		let bucket = argCache.get(first);
		if (bucket === void 0) {
			bucket = prevArgCache.get(first);
			if (bucket !== void 0) argCache.set(first, bucket);
		}
		let hit = null;
		if (bucket !== void 0) {
			if (bucket.skip > 0) {
				bucket.skip--;
				lastHit = null;
				let joined = first;
				for (let i = firstIdx + 1; i < nArgs; i++) {
					const v = vals[i];
					if (v) joined += " " + v;
				}
				return churnLookup(joined, "", false);
			}
			const entries = bucket.e;
			outer: for (let b = 0; b < entries.length; b++) {
				const e = entries[b];
				if (e.t !== truthy) continue;
				const ea = e.a;
				let k = 1;
				for (let i = firstIdx + 1; i < nArgs; i++) {
					const v = vals[i];
					if (v && v !== ea[k++]) continue outer;
				}
				hit = e;
				break;
			}
			if (hit !== null) bucket.miss = 0;
		}
		if (hit === null) {
			let joined = first;
			const a = [first];
			for (let i = firstIdx + 1; i < nArgs; i++) {
				const v = vals[i];
				if (!v) continue;
				joined += " " + v;
				a.push(v);
			}
			if (!seenBefore(joined)) return mergeUncached(joined);
			hit = {
				r: mergeString(joined),
				t: a.length,
				a0: a[0],
				a1: a[1],
				a2: a[2] ?? "",
				a,
				n: null
			};
			if (bucket === void 0) argCache.set(first, bucket = {
				e: [],
				miss: 0,
				skip: 0,
				at: 0
			});
			else if (++bucket.miss > BUCKET_MISS_CAP) {
				bucket.miss = BUCKET_MISS_CAP;
				bucket.skip = BUCKET_SKIP;
				bucket.e.length = 0;
				bucket.at = 0;
			}
			const entries = bucket.e;
			if (entries.length < BUCKET_CAP) entries.push(hit);
			else {
				entries[bucket.at] = hit;
				bucket.at = bucket.at + 1 & 255;
			}
			if (++argCount > 1e3) {
				argCount = 0;
				prevArgCache = argCache;
				argCache = /* @__PURE__ */ new Map();
			}
		}
		if (lastHit !== null && lastHit !== hit) lastHit.n = hit;
		lastHit = hit;
		return hit.r;
	};
	const mergeSingleValue = (value) => Array.isArray(value) ? resolveArgs(value.slice(), false) : mergeString(resolveValue$1(value, true));
	return function(v0, v1, v2) {
		const nArgs = arguments.length;
		if ((nArgs | 1) === 3) {
			const lh = lastHit;
			if (lh !== null) {
				const pred = lh.n;
				if (pred !== null && match3(pred, v0, v1, v2)) {
					lastHit = pred;
					return pred.r;
				}
				if (lh !== pred && match3(lh, v0, v1, v2)) return lh.r;
			}
			if (nArgs === 2 && typeof v1 === "string" && v1 !== "") {
				const bucket = argCache.get(v0);
				if (bucket !== void 0 && bucket.skip > 0) {
					bucket.skip--;
					lastHit = null;
					return churnLookup(v1, v0, true);
				}
			}
			return resolveArgs([
				v0,
				v1,
				v2
			], true);
		}
		if (nArgs === 1) return typeof v0 === "string" ? mergeString(v0) : mergeSingleValue(v0);
		const lh = lastHit;
		if (lh !== null) {
			const pred = lh.n;
			if (pred !== null) {
				const pa = pred.a;
				let k = 0;
				let ok = true;
				for (let i = 0; i < nArgs; i++) {
					const v = arguments[i];
					if (!v) continue;
					if (v !== pa[k]) {
						ok = false;
						break;
					}
					k++;
				}
				if (ok && k === pred.t) {
					lastHit = pred;
					return pred.r;
				}
			}
			if (lh !== pred) {
				const la = lh.a;
				let k = 0;
				let ok = true;
				for (let i = 0; i < nArgs; i++) {
					const v = arguments[i];
					if (!v) continue;
					if (v !== la[k]) {
						ok = false;
						break;
					}
					k++;
				}
				if (ok && k === lh.t) return lh.r;
			}
		}
		const vals = [];
		for (let i = 0; i < nArgs; i++) vals.push(arguments[i]);
		return resolveArgs(vals, true);
	};
};
var instance = /* @__PURE__ */ createEngine(tables_generated_default);
/**
* Merge Tailwind CSS classes with clsx-style arguments (strings, arrays,
* objects, conditionals). Drop-in replacement for `twMerge(clsx(...))`.
*/
var cn = /* @__PURE__ */ wrapClsx(instance.mergeString, instance);
instance.merge;
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/resolve-variant-l6x5ksfrjtu4m66l.js
/**
* Safely resolve a variant config from a variants map, falling back
* to a known-good default when the key doesn't match any entry.
*
* This prevents `TypeError: Cannot read properties of undefined`
* when a component receives an invalid variant value at runtime
* (e.g. from untyped JS consumers, server data, or stale props).
*
* @param variants  – A dimension of a KUMO_*_VARIANTS object
*                    (e.g. `KUMO_BUTTON_VARIANTS.variant`)
* @param key       – The runtime value of the variant prop
* @param fallback  – A key guaranteed to exist (typically from
*                    KUMO_*_DEFAULT_VARIANTS)
* @returns The matched config entry, or the fallback entry
*
* @example
* ```ts
* const config = resolveVariant(
*   KUMO_BUTTON_VARIANTS.variant,
*   variant,
*   KUMO_BUTTON_DEFAULT_VARIANTS.variant,
* );
* // config.classes is always safe to access
* ```
*/
function resolveVariant(variants, key, fallback) {
	const config = variants[key];
	if (config !== void 0) return config;
	console.warn(`[kumo] Unknown variant "${key}". Expected one of: ${Object.keys(variants).join(", ")}. Falling back to "${fallback}".`);
	return variants[fallback];
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/unwrap-lazy-element-hzbdkmujhd7iksau.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var REACT_LAZY_TYPE$1 = Symbol.for("react.lazy");
function isLazyReference(value) {
	return typeof value === "object" && value !== null && value.$$typeof === REACT_LAZY_TYPE$1;
}
function isThenable(value) {
	return typeof value === "object" && value !== null && typeof value.then === "function";
}
/**
* Unwraps a lazy element reference produced by React Flight.
*
* When an element prop (e.g. `icon={<Star />}`) is passed from a Server
* Component, the Flight client can deliver it as a lazy wrapper instead of an
* element (https://github.com/react/react/issues/32392, closed as not
* planned). The wrapper fails `React.isValidElement`, and rendering it as a
* component throws React error #306 because it resolves to an element rather
* than a component.
*
* `React.Children.toArray` resolves the wrapper to its element, the same
* approach Base UI (`unwrapLazyRenderProp`) and Ark UI use. A pending wrapper
* suspends.
*
* Anything that does not resolve to an element is returned unchanged, so the
* caller renders it as a component as before. That includes a `React.lazy`
* component: `toArray` returns nothing for one resolving to a function, and
* throws for one resolving to a `forwardRef` or `memo` object (such as a
* Phosphor icon). It also includes every lazy value on React 18, whose
* `toArray` does not resolve lazy values; Server Components require React 19.
* A genuine error resurfaces when React renders the returned wrapper.
*/
function unwrapLazyElement(value) {
	if (!isLazyReference(value)) return value;
	let unwrapped;
	try {
		unwrapped = import_react.Children.toArray(value)[0];
	} catch (error) {
		if (isThenable(error)) throw error;
		return value;
	}
	return import_react.isValidElement(unwrapped) ? unwrapped : value;
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/link-provider-kbwllpbo24fvgioj.js
var import_jsx_runtime = require_jsx_runtime();
var DefaultLinkComponent = (0, import_react.forwardRef)(function DefaultAnchor({ to, href, ...rest }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		ref,
		href: href ?? to ?? void 0,
		...rest
	});
});
var LinkComponentContext = (0, import_react.createContext)(DefaultLinkComponent);
function useLinkComponent() {
	return (0, import_react.useContext)(LinkComponentContext);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useRenderElement-nkklxbq1rp7h2kw0.js
var UNINITIALIZED = {};
/**
* A React.useRef() that is initialized with a function. Note that it accepts an optional
* initialization argument, so the initialization function doesn't need to be an inline closure.
*
* @usage
*   const ref = useRefWithInit(sortColumns, columns)
*/
function useRefWithInit(init, initArg) {
	const ref = import_react.useRef(UNINITIALIZED);
	if (ref.current === UNINITIALIZED) ref.current = init(initArg);
	return ref;
}
/**
* Merges refs into a single memoized callback ref or `null`.
* This makes sure multiple refs are updated together and have the same value.
*
* This function accepts up to four refs. If you need to merge more, or have an unspecified number of refs to merge,
* use `useMergedRefsN` instead.
*/
function useMergedRefs(a, b, c, d) {
	const forkRef = useRefWithInit(createForkRef).current;
	if (didChange(forkRef, a, b, c, d)) update(forkRef, [
		a,
		b,
		c,
		d
	]);
	return forkRef.callback;
}
/**
* Merges an array of refs into a single memoized callback ref or `null`.
*
* If you need to merge a fixed number (up to four) of refs, use `useMergedRefs` instead for better performance.
*/
function useMergedRefsN(refs) {
	const forkRef = useRefWithInit(createForkRef).current;
	if (didChangeN(forkRef, refs)) update(forkRef, refs);
	return forkRef.callback;
}
function createForkRef() {
	return {
		callback: null,
		cleanup: null,
		refs: []
	};
}
function didChange(forkRef, a, b, c, d) {
	return forkRef.refs[0] !== a || forkRef.refs[1] !== b || forkRef.refs[2] !== c || forkRef.refs[3] !== d;
}
function didChangeN(forkRef, newRefs) {
	return forkRef.refs.length !== newRefs.length || forkRef.refs.some((ref, index) => ref !== newRefs[index]);
}
function update(forkRef, refs) {
	forkRef.refs = refs;
	if (refs.every((ref) => ref == null)) {
		forkRef.callback = null;
		return;
	}
	forkRef.callback = (instance) => {
		if (forkRef.cleanup) {
			forkRef.cleanup();
			forkRef.cleanup = null;
		}
		if (instance != null) {
			const cleanupCallbacks = Array(refs.length).fill(null);
			for (let i = 0; i < refs.length; i += 1) {
				const ref = refs[i];
				if (ref == null) continue;
				switch (typeof ref) {
					case "function": {
						const refCleanup = ref(instance);
						if (typeof refCleanup === "function") cleanupCallbacks[i] = refCleanup;
						break;
					}
					case "object": ref.current = instance;
				}
			}
			forkRef.cleanup = () => {
				for (let i = 0; i < refs.length; i += 1) {
					const ref = refs[i];
					if (ref == null) continue;
					switch (typeof ref) {
						case "function": {
							const cleanupCallback = cleanupCallbacks[i];
							if (typeof cleanupCallback === "function") cleanupCallback();
							else ref(null);
							break;
						}
						case "object": ref.current = null;
					}
				}
			};
		}
	};
}
var majorVersion = parseInt("19.2.8", 10);
function isReactVersionAtLeast(reactVersionToCheck) {
	return majorVersion >= reactVersionToCheck;
}
/**
* Extracts the `ref` from a React element, handling different React versions.
*/
function getReactElementRef(element) {
	if (!/*#__PURE__*/ import_react.isValidElement(element)) return null;
	const reactElement = element;
	const propsWithRef = reactElement.props;
	return (isReactVersionAtLeast(19) ? propsWithRef?.ref : reactElement.ref) ?? null;
}
function mergeObjects(a, b) {
	if (a && !b) return a;
	if (!a && b) return b;
	if (a || b) return {
		...a,
		...b
	};
}
var loggedMessages = /* @__PURE__ */ new Set();
/** Creates a dev-only logger that writes each unique message to `console[severity]` once. */
function createLogOnce(severity, prefix) {
	return function logOnce(...messages) {
		{
			const message = messages.join(" ");
			const output = prefix ? `${prefix}: ${message}` : message;
			const key = `${severity}:${output}`;
			if (!loggedMessages.has(key)) {
				loggedMessages.add(key);
				if (severity === "warn") console.warn(output);
				else console.error(output);
			}
		}
	};
}
var warn = createLogOnce("warn", "Base UI");
function NOOP() {}
var EMPTY_ARRAY = Object.freeze([]);
var EMPTY_OBJECT = Object.freeze({});
function getStateAttributesProps(state, customMapping) {
	const props = {};
	for (const key in state) {
		const value = state[key];
		if (customMapping?.hasOwnProperty(key)) {
			const customProps = customMapping[key](value);
			if (customProps != null) Object.assign(props, customProps);
			continue;
		}
		if (value === true) props[`data-${key.toLowerCase()}`] = "";
		else if (value) props[`data-${key.toLowerCase()}`] = value.toString();
	}
	return props;
}
/**
* If the provided className is a string, it will be returned as is.
* Otherwise, the function will call the className function with the state as the first argument.
*
* @param className
* @param state
*/
function resolveClassName(className, state) {
	return typeof className === "function" ? className(state) : className;
}
/**
* If the provided style is an object, it will be returned as is.
* Otherwise, the function will call the style function with the state as the first argument.
*
* @param style
* @param state
*/
function resolveStyle(style, state) {
	return typeof style === "function" ? style(state) : style;
}
var EMPTY_PROPS = {};
/**
* Merges multiple sets of React props. It follows the Object.assign pattern where the rightmost object's fields overwrite
* the conflicting ones from others. This doesn't apply to event handlers, `className` and `style` props.
*
* Event handlers are merged and called in right-to-left order (rightmost handler executes first, leftmost last).
* For React synthetic events, the rightmost handler can prevent prior (left-positioned) handlers from executing
* by calling `event.preventBaseUIHandler()`. For non-synthetic events (custom events with primitive/object values),
* all handlers always execute without prevention capability.
*
* The `className` prop is merged by concatenating classes in right-to-left order (rightmost class appears first in the string).
* The `style` prop is merged with rightmost styles overwriting the prior ones.
*
* Props can either be provided as objects or as functions that take the previous props as an argument.
* The function will receive the merged props up to that point (going from left to right):
* so in the case of `(obj1, obj2, fn, obj3)`, `fn` will receive the merged props of `obj1` and `obj2`.
* The function is responsible for chaining event handlers if needed (that is, we don't run the merge logic).
*
* Event handlers returned by the functions are not automatically prevented when `preventBaseUIHandler` is called.
* They must check `event.baseUIHandlerPrevented` themselves and bail out if it's true.
*
* @important **`ref` is not merged.**
* @param a Props object to merge.
* @param b Props object to merge. The function will overwrite conflicting props from `a`.
* @param c Props object to merge. The function will overwrite conflicting props from previous parameters.
* @param d Props object to merge. The function will overwrite conflicting props from previous parameters.
* @param e Props object to merge. The function will overwrite conflicting props from previous parameters.
* @returns The merged props.
* @public
*/
function mergeProps(a, b, c, d, e) {
	if (!c && !d && !e && !a) return createInitialMergedProps(b);
	let merged = createInitialMergedProps(a);
	if (b) merged = mergeInto(merged, b);
	if (c) merged = mergeInto(merged, c);
	if (d) merged = mergeInto(merged, d);
	if (e) merged = mergeInto(merged, e);
	return merged;
}
/**
* Merges an arbitrary number of React props using the same logic as {@link mergeProps}.
* This function accepts an array of props instead of individual arguments.
*
* This has slightly lower performance than {@link mergeProps} due to accepting an array
* instead of a fixed number of arguments. Prefer {@link mergeProps} when merging 5 or
* fewer prop sets for better performance.
*
* @param props Array of props to merge.
* @returns The merged props.
* @see mergeProps
* @public
*/
function mergePropsN(props) {
	if (props.length === 0) return EMPTY_PROPS;
	if (props.length === 1) return createInitialMergedProps(props[0]);
	let merged = createInitialMergedProps(props[0]);
	for (let i = 1; i < props.length; i += 1) merged = mergeInto(merged, props[i]);
	return merged;
}
function createInitialMergedProps(inputProps) {
	if (isPropsGetter(inputProps)) return { ...inputProps(EMPTY_PROPS) };
	return copyInitialProps(inputProps);
}
function mergeInto(merged, inputProps) {
	if (isPropsGetter(inputProps)) return inputProps(merged);
	return mutablyMergeInto(merged, inputProps);
}
function copyInitialProps(inputProps) {
	const copiedProps = { ...inputProps };
	for (const propName in copiedProps) {
		const propValue = copiedProps[propName];
		if (isEventHandler(propName, propValue)) copiedProps[propName] = wrapEventHandler(propValue);
	}
	return copiedProps;
}
/**
* Merges two sets of props. In case of conflicts, the external props take precedence.
*/
function mutablyMergeInto(mergedProps, externalProps) {
	if (!externalProps) return mergedProps;
	for (const propName in externalProps) {
		const externalPropValue = externalProps[propName];
		switch (propName) {
			case "style":
				mergedProps[propName] = mergeObjects(mergedProps.style, externalPropValue);
				break;
			case "className":
				mergedProps[propName] = mergeClassNames(mergedProps.className, externalPropValue);
				break;
			default: if (isEventHandler(propName, externalPropValue)) mergedProps[propName] = mergeEventHandlers(mergedProps[propName], externalPropValue);
			else mergedProps[propName] = externalPropValue;
		}
	}
	return mergedProps;
}
function isEventHandler(key, value) {
	const code0 = key.charCodeAt(0);
	const code1 = key.charCodeAt(1);
	const code2 = key.charCodeAt(2);
	return code0 === 111 && code1 === 110 && code2 >= 65 && code2 <= 90 && (typeof value === "function" || typeof value === "undefined");
}
function isPropsGetter(inputProps) {
	return typeof inputProps === "function";
}
function mergeEventHandlers(ourHandler, theirHandler) {
	if (!theirHandler) return ourHandler;
	if (!ourHandler) return wrapEventHandler(theirHandler);
	return (...args) => {
		const event = args[0];
		if (isSyntheticEvent(event)) {
			const baseUIEvent = event;
			makeEventPreventable(baseUIEvent);
			const result = theirHandler(...args);
			if (!baseUIEvent.baseUIHandlerPrevented) ourHandler?.(...args);
			return result;
		}
		const result = theirHandler(...args);
		ourHandler?.(...args);
		return result;
	};
}
function wrapEventHandler(handler) {
	if (!handler) return handler;
	return (...args) => {
		const event = args[0];
		if (isSyntheticEvent(event)) makeEventPreventable(event);
		return handler(...args);
	};
}
function makeEventPreventable(event) {
	event.preventBaseUIHandler = () => {
		event.baseUIHandlerPrevented = true;
	};
	return event;
}
function mergeClassNames(ourClassName, theirClassName) {
	if (theirClassName) {
		if (ourClassName) return theirClassName + " " + ourClassName;
		return theirClassName;
	}
	return ourClassName;
}
function isSyntheticEvent(event) {
	return event != null && typeof event === "object" && "nativeEvent" in event;
}
/**
* Renders a Base UI element.
*
* @param element The default HTML element to render. Can be overridden by the `render` prop.
* @param componentProps An object containing the `render` and `className` props to be used for element customization. Other props are ignored.
* @param params Additional parameters for rendering the element.
*/
function useRenderElement(element, componentProps, params = {}) {
	let renderProp = componentProps.render;
	if (params.enabled !== false) renderProp = unwrapLazyRenderProp(renderProp);
	const outProps = useRenderElementProps(componentProps, params, renderProp);
	if (params.enabled === false) return null;
	const state = params.state ?? EMPTY_OBJECT;
	return evaluateRenderProp(element, renderProp, outProps, state);
}
/**
* Computes render element final props.
*/
function useRenderElementProps(componentProps, params, renderProp) {
	const { className: classNameProp, style: styleProp } = componentProps;
	const { state = EMPTY_OBJECT, ref, props, stateAttributesMapping, enabled = true } = params;
	const className = enabled ? resolveClassName(classNameProp, state) : void 0;
	const style = enabled ? resolveStyle(styleProp, state) : void 0;
	const stateProps = enabled ? getStateAttributesProps(state, stateAttributesMapping) : EMPTY_OBJECT;
	const resolvedProps = enabled && props ? resolveRenderFunctionProps(props) : void 0;
	const outProps = enabled ? mergeObjects(stateProps, resolvedProps) ?? {} : EMPTY_OBJECT;
	if (typeof document !== "undefined") if (!enabled) useMergedRefs(null, null);
	else if (Array.isArray(ref)) outProps.ref = useMergedRefsN([
		outProps.ref,
		getReactElementRef(renderProp),
		...ref
	]);
	else outProps.ref = useMergedRefs(outProps.ref, getReactElementRef(renderProp), ref);
	if (!enabled) return EMPTY_OBJECT;
	if (className !== void 0) outProps.className = mergeClassNames(outProps.className, className);
	if (style !== void 0) outProps.style = mergeObjects(outProps.style, style);
	return outProps;
}
function resolveRenderFunctionProps(props) {
	if (Array.isArray(props)) return mergePropsN(props);
	return mergeProps(void 0, props);
}
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var COMPONENT_IDENTIFIER_PATTERN = /^[A-Z][A-Za-z0-9$]*$/;
var LOWERCASE_CHARACTER_PATTERN = /[a-z]/;
function unwrapLazyRenderProp(render) {
	if (render?.$$typeof !== REACT_LAZY_TYPE) return render;
	const unwrapped = import_react.Children.toArray(render)[0];
	return /*#__PURE__*/ import_react.isValidElement(unwrapped) ? unwrapped : render;
}
function evaluateRenderProp(element, render, props, state) {
	if (render) {
		if (typeof render === "function") {
			warnIfRenderPropLooksLikeComponent(render);
			return render(props, state);
		}
		const mergedProps = mergeProps(props, render.props);
		mergedProps.ref = props.ref;
		if (!/*#__PURE__*/ import_react.isValidElement(render)) throw new Error([
			"Base UI: The `render` prop was provided an invalid React element as `React.isValidElement(render)` is `false`.",
			"A valid React element must be provided to the `render` prop because it is cloned with props to replace the default element.",
			"https://base-ui.com/r/invalid-render-prop"
		].join("\n"));
		return /*#__PURE__*/ import_react.cloneElement(render, mergedProps);
	}
	return renderTag(element, props);
}
function warnIfRenderPropLooksLikeComponent(renderFn) {
	const functionName = renderFn.name;
	if (functionName.length === 0) return;
	if (!COMPONENT_IDENTIFIER_PATTERN.test(functionName)) return;
	if (!LOWERCASE_CHARACTER_PATTERN.test(functionName)) return;
	warn(`The \`render\` prop received a function named \`${functionName}\` that starts with an uppercase letter.`, "This usually means a React component was passed directly as `render={Component}`.", "Base UI calls `render` as a plain function, which can break the Rules of Hooks during reconciliation.", "If this is an intentional render callback, rename it to start with a lowercase letter.", "Use `render={<Component />}` or `render={(props) => <Component {...props} />}` instead.", "https://base-ui.com/r/invalid-render-prop");
}
function renderTag(Tag, props) {
	if (Tag === "button") return /*#__PURE__*/ (0, import_react.createElement)("button", {
		type: "button",
		...props,
		key: props.key
	});
	if (Tag === "img") return /*#__PURE__*/ (0, import_react.createElement)("img", {
		alt: "",
		...props,
		key: props.key
	});
	return /*#__PURE__*/ import_react.createElement(Tag, props);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/loader-kv5nk8j8tsuesxqo.js
/** Loader size variant definitions mapping sizes to their pixel values. */
var KUMO_LOADER_VARIANTS = { size: {
	sm: {
		value: 16,
		description: "Small loader for inline use"
	},
	base: {
		value: 24,
		description: "Default loader size"
	},
	lg: {
		value: 32,
		description: "Large loader for prominent loading states"
	}
} };
var KUMO_LOADER_DEFAULT_VARIANTS = { size: "base" };
function loaderVariants({ size = KUMO_LOADER_DEFAULT_VARIANTS.size } = {}) {
	if (typeof size === "number") return size;
	return resolveVariant(KUMO_LOADER_VARIANTS.size, size, KUMO_LOADER_DEFAULT_VARIANTS.size).value;
}
/**
* Animated circular spinner for indicating loading states.
*
* @example
* ```tsx
* <Loader />
* ```
*/
var Loader = ({ className, size = KUMO_LOADER_DEFAULT_VARIANTS.size, "aria-label": ariaLabel = "Loading" }) => {
	const sizeValue = loaderVariants({ size });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: sizeValue,
		height: sizeValue,
		viewBox: "0 0 24 24",
		xmlns: "http://www.w3.org/2000/svg",
		stroke: "currentColor",
		className,
		role: "status",
		"aria-label": ariaLabel,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("circle", {
			cx: "12",
			cy: "12",
			r: "9.5",
			fill: "none",
			strokeWidth: "2",
			strokeLinecap: "round",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateTransform", {
					attributeName: "transform",
					type: "rotate",
					from: "0 12 12",
					to: "360 12 12",
					dur: "2s",
					repeatCount: "indefinite"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
					attributeName: "stroke-dasharray",
					values: "0 150;42 150;42 150",
					keyTimes: "0;0.5;1",
					dur: "1.5s",
					repeatCount: "indefinite"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
					attributeName: "stroke-dashoffset",
					values: "0;-16;-59",
					keyTimes: "0;0.5;1",
					dur: "1.5s",
					repeatCount: "indefinite"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "9.5",
			fill: "none",
			opacity: .1,
			strokeWidth: "2",
			strokeLinecap: "round"
		})]
	});
};
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/portal-provider-eveknxf26oudn7pp.js
var import_shim = require_shim();
var import_with_selector = require_with_selector();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var PortalContainerContext = (0, import_react.createContext)(null);
/**
* Hook to get the portal container from context.
* Returns null if no provider is present (defaults to document.body).
*
* @internal Used by overlay components to resolve their portal container.
*/
function usePortalContainer() {
	return (0, import_react.useContext)(PortalContainerContext);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/safeReact-ek77ilng4ekk7mgz.js
var noop = () => {};
var useIsoLayoutEffect = typeof document !== "undefined" ? import_react.useLayoutEffect : noop;
/**
* A clone of the React namespace for reading APIs that may be missing in older
* supported React versions. Bundlers can rewrite direct `React.someNewApi`
* reads into named imports, which breaks React 17. Reading from this cloned
* object keeps those lookups optional.
*
* @see https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379
*/
var SafeReact = { ...import_react };
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/vendor-floating-ui-fqblx3wa0r71mjoo.js
function hasWindow() {
	return typeof window !== "undefined";
}
function getNodeName(node) {
	if (isNode(node)) return (node.nodeName || "").toLowerCase();
	return "#document";
}
function getWindow(node) {
	var _node$ownerDocument;
	return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
	var _ref;
	return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
	if (!hasWindow()) return false;
	return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
	if (!hasWindow()) return false;
	return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
	if (!hasWindow()) return false;
	return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
	if (!hasWindow() || typeof ShadowRoot === "undefined") return false;
	return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
	const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element);
	return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
	return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
	try {
		if (element.matches(":popover-open")) return true;
	} catch (_e) {}
	try {
		return element.matches(":modal");
	} catch (_e) {
		return false;
	}
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
	const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
	return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
	let currentNode = getParentNode(element);
	while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
		if (isContainingBlock(currentNode)) return currentNode;
		else if (isTopLayer(currentNode)) return null;
		currentNode = getParentNode(currentNode);
	}
	return null;
}
function isWebKit() {
	if (isWebKitValue == null) isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
	return isWebKitValue;
}
function isLastTraversableNode(node) {
	return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
	return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
	if (isElement(element)) return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
	return {
		scrollLeft: element.scrollX,
		scrollTop: element.scrollY
	};
}
function getParentNode(node) {
	if (getNodeName(node) === "html") return node;
	const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
	return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
	const parentNode = getParentNode(node);
	if (isLastTraversableNode(parentNode)) return (node.ownerDocument || node).body;
	if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) return parentNode;
	return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
	var _node$ownerDocument2;
	if (list === void 0) list = [];
	if (traverseIframes === void 0) traverseIframes = true;
	const scrollableAncestor = getNearestOverflowAncestor(node);
	const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
	const win = getWindow(scrollableAncestor);
	if (isBody) {
		const frameElement = getFrameElement(win);
		return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
	} else return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
	return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
	x: v,
	y: v
});
var oppositeSideMap = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function clamp(start, value, end) {
	return max(start, min(value, end));
}
function evaluate(value, param) {
	return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
	return placement.split("-")[0];
}
function getAlignment(placement) {
	return placement.split("-")[1];
}
function getOppositeAxis(axis) {
	return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
	return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
	const firstChar = placement[0];
	return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
	return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
	if (rtl === void 0) rtl = false;
	const alignment = getAlignment(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const length = getAxisLength(alignmentAxis);
	let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
	if (rects.reference[length] > rects.floating[length]) mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
	return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
	const oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeAlignmentPlacement(placement),
		oppositePlacement,
		getOppositeAlignmentPlacement(oppositePlacement)
	];
}
function getOppositeAlignmentPlacement(placement) {
	return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
	switch (side) {
		case "top":
		case "bottom":
			if (rtl) return isStart ? rlPlacement : lrPlacement;
			return isStart ? lrPlacement : rlPlacement;
		case "left":
		case "right": return isStart ? tbPlacement : btPlacement;
		default: return [];
	}
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
	const alignment = getAlignment(placement);
	let list = getSideList(getSide(placement), direction === "start", rtl);
	if (alignment) {
		list = list.map((side) => side + "-" + alignment);
		if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement));
	}
	return list;
}
function getOppositePlacement(placement) {
	const side = getSide(placement);
	return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
	var _padding$top, _padding$right, _padding$bottom, _padding$left;
	return {
		top: (_padding$top = padding.top) != null ? _padding$top : 0,
		right: (_padding$right = padding.right) != null ? _padding$right : 0,
		bottom: (_padding$bottom = padding.bottom) != null ? _padding$bottom : 0,
		left: (_padding$left = padding.left) != null ? _padding$left : 0
	};
}
function getPaddingObject(padding) {
	return typeof padding !== "number" ? expandPaddingObject(padding) : {
		top: padding,
		right: padding,
		bottom: padding,
		left: padding
	};
}
function rectToClientRect(rect) {
	const { x, y, width, height } = rect;
	return {
		width,
		height,
		top: y,
		left: x,
		right: x + width,
		bottom: y + height,
		x,
		y
	};
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
	let { reference, floating } = _ref;
	const sideAxis = getSideAxis(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const alignLength = getAxisLength(alignmentAxis);
	const side = getSide(placement);
	const isVertical = sideAxis === "y";
	const commonX = reference.x + reference.width / 2 - floating.width / 2;
	const commonY = reference.y + reference.height / 2 - floating.height / 2;
	const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
	let coords;
	switch (side) {
		case "top":
			coords = {
				x: commonX,
				y: reference.y - floating.height
			};
			break;
		case "bottom":
			coords = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case "right":
			coords = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case "left":
			coords = {
				x: reference.x - floating.width,
				y: commonY
			};
			break;
		default: coords = {
			x: reference.x,
			y: reference.y
		};
	}
	const alignment = getAlignment(placement);
	if (alignment) coords[alignmentAxis] += commonAlign * (alignment === "end" ? 1 : -1) * (rtl && isVertical ? -1 : 1);
	return coords;
}
/**
* Resolves with an object of overflow side offsets that determine how much the
* element is overflowing a given clipping boundary on each side.
* - positive = overflowing the boundary by that number of pixels
* - negative = how many pixels left before it will overflow
* - 0 = lies flush with the boundary
* @see https://floating-ui.com/docs/detectOverflow
*/
async function detectOverflow(state, options) {
	var _await$platform$isEle;
	if (options === void 0) options = {};
	const { x, y, platform, rects, elements, strategy } = state;
	const { boundary = "clippingAncestors", rootBoundary = "viewport", elementContext = "floating", altBoundary = false, padding = 0 } = evaluate(options, state);
	const paddingObject = getPaddingObject(padding);
	const element = elements[altBoundary ? elementContext === "floating" ? "reference" : "floating" : elementContext];
	const clippingClientRect = rectToClientRect(await platform.getClippingRect({
		element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating)),
		boundary,
		rootBoundary,
		strategy
	}));
	const rect = elementContext === "floating" ? {
		x,
		y,
		width: rects.floating.width,
		height: rects.floating.height
	} : rects.reference;
	const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
	const offsetScale = await (platform.isElement == null ? void 0 : platform.isElement(offsetParent)) && await (platform.getScale == null ? void 0 : platform.getScale(offsetParent)) || {
		x: 1,
		y: 1
	};
	const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements,
		rect,
		offsetParent,
		strategy
	}) : rect);
	return {
		top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
		bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
		left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
		right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
	};
}
var MAX_RESET_COUNT = 50;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*
* This export does not have any `platform` interface logic. You will need to
* write one for the platform you are using Floating UI with.
*/
var computePosition$1 = async (reference, floating, config) => {
	const { placement = "bottom", strategy = "absolute", middleware = [], platform } = config;
	const platformWithDetectOverflow = platform.detectOverflow ? platform : {
		...platform,
		detectOverflow
	};
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
	let rects = await platform.getElementRects({
		reference,
		floating,
		strategy
	});
	let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
	let statefulPlacement = placement;
	let resetCount = 0;
	const middlewareData = {};
	for (let i = 0; i < middleware.length; i++) {
		const currentMiddleware = middleware[i];
		if (!currentMiddleware) continue;
		const { name, fn } = currentMiddleware;
		const { x: nextX, y: nextY, data, reset } = await fn({
			x,
			y,
			initialPlacement: placement,
			placement: statefulPlacement,
			strategy,
			middlewareData,
			rects,
			platform: platformWithDetectOverflow,
			elements: {
				reference,
				floating
			}
		});
		x = nextX != null ? nextX : x;
		y = nextY != null ? nextY : y;
		middlewareData[name] = {
			...middlewareData[name],
			...data
		};
		if (reset && resetCount < MAX_RESET_COUNT) {
			resetCount++;
			if (typeof reset === "object") {
				if (reset.placement) statefulPlacement = reset.placement;
				if (reset.rects) rects = reset.rects === true ? await platform.getElementRects({
					reference,
					floating,
					strategy
				}) : reset.rects;
				({x, y} = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
			}
			i = -1;
		}
	}
	return {
		x,
		y,
		placement: statefulPlacement,
		strategy,
		middlewareData
	};
};
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip$2 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "flip",
		options,
		async fn(state) {
			var _middlewareData$arrow, _middlewareData$flip;
			const { placement, middlewareData, rects, initialPlacement, platform, elements } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = "bestFit", fallbackAxisSideDirection = "none", flipAlignment = true, ...detectOverflowOptions } = evaluate(options, state);
			if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			const side = getSide(placement);
			const initialSideAxis = getSideAxis(initialPlacement);
			const isBasePlacement = getSide(initialPlacement) === initialPlacement;
			const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
			const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
			const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
			if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
			const placements = [initialPlacement, ...fallbackPlacements];
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const overflows = [];
			let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
			if (checkMainAxis) overflows.push(overflow[side]);
			if (checkCrossAxis) {
				const sides = getAlignmentSides(placement, rects, rtl);
				overflows.push(overflow[sides[0]], overflow[sides[1]]);
			}
			overflowsData = [...overflowsData, {
				placement,
				overflows
			}];
			if (!overflows.every((side) => side <= 0)) {
				var _middlewareData$flip2, _overflowsData$filter;
				const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
				const nextPlacement = placements[nextIndex];
				if (nextPlacement) {
					if (!(checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false) || overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) return {
						data: {
							index: nextIndex,
							overflows: overflowsData
						},
						reset: { placement: nextPlacement }
					};
				}
				let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
				if (!resetPlacement) switch (fallbackStrategy) {
					case "bestFit": {
						var _overflowsData$filter2;
						const placement = (_overflowsData$filter2 = overflowsData.filter((d) => {
							if (hasFallbackAxisSideDirection) {
								const currentSideAxis = getSideAxis(d.placement);
								return currentSideAxis === initialSideAxis || currentSideAxis === "y";
							}
							return true;
						}).map((d) => [d.placement, d.overflows.filter((overflow) => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
						if (placement) resetPlacement = placement;
						break;
					}
					case "initialPlacement": resetPlacement = initialPlacement;
				}
				if (placement !== resetPlacement) return { reset: { placement: resetPlacement } };
			}
			return {};
		}
	};
};
var originSides = /*#__PURE__*/ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
	const { placement, platform, elements } = state;
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
	const side = getSide(placement);
	const alignment = getAlignment(placement);
	const isVertical = getSideAxis(placement) === "y";
	const mainAxisMulti = originSides.has(side) ? -1 : 1;
	const crossAxisMulti = rtl && isVertical ? -1 : 1;
	const rawValue = evaluate(options, state);
	let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === "number" ? {
		mainAxis: rawValue,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: rawValue.mainAxis || 0,
		crossAxis: rawValue.crossAxis || 0,
		alignmentAxis: rawValue.alignmentAxis
	};
	if (alignment && typeof alignmentAxis === "number") crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
	return isVertical ? {
		x: crossAxis * crossAxisMulti,
		y: mainAxis * mainAxisMulti
	} : {
		x: mainAxis * mainAxisMulti,
		y: crossAxis * crossAxisMulti
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset$2 = function(options) {
	if (options === void 0) options = 0;
	return {
		name: "offset",
		options,
		async fn(state) {
			var _middlewareData$offse, _middlewareData$arrow;
			const { x, y, placement, middlewareData } = state;
			const diffCoords = await convertValueToCoords(state, options);
			if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			return {
				x: x + diffCoords.x,
				y: y + diffCoords.y,
				data: {
					...diffCoords,
					placement
				}
			};
		}
	};
};
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift$2 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "shift",
		options,
		async fn(state) {
			const { x, y, placement, platform } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = { fn: (_ref) => {
				let { x, y } = _ref;
				return {
					x,
					y
				};
			} }, ...detectOverflowOptions } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const clampCoord = (axis, coord) => clamp(coord + overflow[axis === "y" ? "top" : "left"], coord, coord - overflow[axis === "y" ? "bottom" : "right"]);
			if (checkMainAxis) mainAxisCoord = clampCoord(mainAxis, mainAxisCoord);
			if (checkCrossAxis) crossAxisCoord = clampCoord(crossAxis, crossAxisCoord);
			const limitedCoords = limiter.fn({
				...state,
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			});
			return {
				...limitedCoords,
				data: {
					x: limitedCoords.x - x,
					y: limitedCoords.y - y,
					enabled: {
						[mainAxis]: checkMainAxis,
						[crossAxis]: checkCrossAxis
					}
				}
			};
		}
	};
};
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift$2 = function(options) {
	if (options === void 0) options = {};
	return {
		options,
		fn(state) {
			var _rawOffset$mainAxis, _rawOffset$crossAxis;
			const { x, y, placement, rects, middlewareData } = state;
			const { offset = 0, mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const rawOffset = evaluate(offset, state);
			const computedOffset = typeof rawOffset === "number" ? {
				mainAxis: rawOffset,
				crossAxis: 0
			} : {
				mainAxis: (_rawOffset$mainAxis = rawOffset.mainAxis) != null ? _rawOffset$mainAxis : 0,
				crossAxis: (_rawOffset$crossAxis = rawOffset.crossAxis) != null ? _rawOffset$crossAxis : 0
			};
			if (checkMainAxis) {
				const len = mainAxis === "y" ? "height" : "width";
				const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
				const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
				if (mainAxisCoord < limitMin) mainAxisCoord = limitMin;
				else if (mainAxisCoord > limitMax) mainAxisCoord = limitMax;
			}
			if (checkCrossAxis) {
				var _middlewareData$offse, _middlewareData$offse2;
				const len = mainAxis === "y" ? "width" : "height";
				const isOriginSide = originSides.has(getSide(placement));
				const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
				const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
				if (crossAxisCoord < limitMin) crossAxisCoord = limitMin;
				else if (crossAxisCoord > limitMax) crossAxisCoord = limitMax;
			}
			return {
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			};
		}
	};
};
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size$2 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "size",
		options,
		async fn(state) {
			const { placement, rects, platform, elements } = state;
			const { apply = () => {}, ...detectOverflowOptions } = evaluate(options, state);
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const side = getSide(placement);
			const alignment = getAlignment(placement);
			const isYAxis = getSideAxis(placement) === "y";
			const { width, height } = rects.floating;
			let heightSide;
			let widthSide;
			if (side === "top" || side === "bottom") {
				heightSide = side;
				widthSide = alignment === (await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
			} else {
				widthSide = side;
				heightSide = alignment === "end" ? "top" : "bottom";
			}
			const maximumClippingHeight = height - overflow.top - overflow.bottom;
			const maximumClippingWidth = width - overflow.left - overflow.right;
			const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
			const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
			const shiftData = state.middlewareData.shift;
			const noShift = !shiftData;
			let availableHeight = overflowAvailableHeight;
			let availableWidth = overflowAvailableWidth;
			if (shiftData != null && shiftData.enabled.x) availableWidth = maximumClippingWidth;
			if (shiftData != null && shiftData.enabled.y) availableHeight = maximumClippingHeight;
			if (noShift && !alignment) if (isYAxis) availableWidth = width - 2 * max(overflow.left, overflow.right);
			else availableHeight = height - 2 * max(overflow.top, overflow.bottom);
			await apply({
				...state,
				availableWidth,
				availableHeight
			});
			const nextDimensions = await platform.getDimensions(elements.floating);
			if (width !== nextDimensions.width || height !== nextDimensions.height) return { reset: { rects: true } };
			return {};
		}
	};
};
function getCssDimensions(element) {
	const css = getComputedStyle$1(element);
	let width = parseFloat(css.width) || 0;
	let height = parseFloat(css.height) || 0;
	const hasOffset = isHTMLElement(element);
	const offsetWidth = hasOffset ? element.offsetWidth : width;
	const offsetHeight = hasOffset ? element.offsetHeight : height;
	const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
	if (shouldFallback) {
		width = offsetWidth;
		height = offsetHeight;
	}
	return {
		width,
		height,
		$: shouldFallback
	};
}
function unwrapElement(element) {
	return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
	const domElement = unwrapElement(element);
	if (!isHTMLElement(domElement)) return createCoords(1);
	const rect = domElement.getBoundingClientRect();
	const { width, height, $ } = getCssDimensions(domElement);
	let x = ($ ? round(rect.width) : rect.width) / width;
	let y = ($ ? round(rect.height) : rect.height) / height;
	if (!x || !Number.isFinite(x)) x = 1;
	if (!y || !Number.isFinite(y)) y = 1;
	return {
		x,
		y
	};
}
var noOffsets = /*#__PURE__*/ createCoords(0);
function getVisualOffsets(element) {
	const win = getWindow(element);
	if (!isWebKit() || !win.visualViewport) return noOffsets;
	return {
		x: win.visualViewport.offsetLeft,
		y: win.visualViewport.offsetTop
	};
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
	if (isFixed === void 0) isFixed = false;
	return !!floatingOffsetParent && isFixed && floatingOffsetParent === getWindow(element);
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	const clientRect = element.getBoundingClientRect();
	const domElement = unwrapElement(element);
	let scale = createCoords(1);
	if (includeScale) if (offsetParent) {
		if (isElement(offsetParent)) scale = getScale(offsetParent);
	} else scale = getScale(element);
	const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
	let x = (clientRect.left + visualOffsets.x) / scale.x;
	let y = (clientRect.top + visualOffsets.y) / scale.y;
	let width = clientRect.width / scale.x;
	let height = clientRect.height / scale.y;
	if (domElement && offsetParent) {
		const win = getWindow(domElement);
		const offsetWin = isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
		let currentWin = win;
		let currentIFrame = getFrameElement(currentWin);
		while (currentIFrame && offsetWin !== currentWin) {
			const iframeScale = getScale(currentIFrame);
			const iframeRect = currentIFrame.getBoundingClientRect();
			const css = getComputedStyle$1(currentIFrame);
			const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
			const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
			x *= iframeScale.x;
			y *= iframeScale.y;
			width *= iframeScale.x;
			height *= iframeScale.y;
			x += left;
			y += top;
			currentWin = getWindow(currentIFrame);
			currentIFrame = getFrameElement(currentWin);
		}
	}
	return rectToClientRect({
		width,
		height,
		x,
		y
	});
}
function getWindowScrollBarX(element, rect) {
	const leftScroll = getNodeScroll(element).scrollLeft;
	if (!rect) return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
	return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
	const htmlRect = documentElement.getBoundingClientRect();
	return {
		x: htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect),
		y: htmlRect.top + scroll.scrollTop
	};
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
	let { elements, rect, offsetParent, strategy } = _ref;
	const isFixed = strategy === "fixed";
	const documentElement = getDocumentElement(offsetParent);
	const topLayer = elements ? isTopLayer(elements.floating) : false;
	if (offsetParent === documentElement || topLayer && isFixed) return rect;
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	let scale = createCoords(1);
	const offsets = createCoords(0);
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	if (isOffsetParentAnElement || !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent);
			scale = getScale(offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		width: rect.width * scale.x,
		height: rect.height * scale.y,
		x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
		y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
	};
}
function getClientRects(element) {
	return element.getClientRects ? Array.from(element.getClientRects()) : [];
}
function getDocumentRect(html) {
	const scroll = getNodeScroll(html);
	const body = html.ownerDocument.body;
	const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
	const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
	let x = -scroll.scrollLeft + getWindowScrollBarX(html);
	const y = -scroll.scrollTop;
	if (getComputedStyle$1(body).direction === "rtl") x += max(html.clientWidth, body.clientWidth) - width;
	return {
		width,
		height,
		x,
		y
	};
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy, rootBoundary) {
	if (rootBoundary === void 0) rootBoundary = "viewport";
	const isLayoutViewport = rootBoundary === "layoutViewport";
	const win = getWindow(element);
	const html = getDocumentElement(element);
	const visualViewport = win.visualViewport;
	let width = html.clientWidth;
	let height = html.clientHeight;
	let x = 0;
	let y = 0;
	if (visualViewport) {
		const layoutRelativeClientCoords = !isWebKit() || strategy === "fixed";
		if (isLayoutViewport) {
			if (!layoutRelativeClientCoords) {
				x = -visualViewport.offsetLeft;
				y = -visualViewport.offsetTop;
			}
		} else {
			width = visualViewport.width;
			height = visualViewport.height;
			if (layoutRelativeClientCoords) {
				x = visualViewport.offsetLeft;
				y = visualViewport.offsetTop;
			}
		}
	}
	if (getWindowScrollBarX(html) <= 0) {
		const doc = html.ownerDocument;
		const body = doc.body;
		const bodyStyles = getComputedStyle(body);
		const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
		const reservedWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
		const gutter = getComputedStyle(html).scrollbarGutter === "stable both-edges" ? reservedWidth / 2 : reservedWidth;
		if (gutter <= SCROLLBAR_MAX) width -= gutter;
	}
	return {
		width,
		height,
		x,
		y
	};
}
function getInnerBoundingClientRect(element, strategy) {
	const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
	const top = clientRect.top + element.clientTop;
	const left = clientRect.left + element.clientLeft;
	const scale = getScale(element);
	return {
		width: element.clientWidth * scale.x,
		height: element.clientHeight * scale.y,
		x: left * scale.x,
		y: top * scale.y
	};
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
	let rect;
	if (clippingAncestor === "viewport" || clippingAncestor === "layoutViewport") rect = getViewportRect(element, strategy, clippingAncestor);
	else if (clippingAncestor === "document") rect = getDocumentRect(getDocumentElement(element));
	else if (isElement(clippingAncestor)) rect = getInnerBoundingClientRect(clippingAncestor, strategy);
	else {
		const visualOffsets = getVisualOffsets(element);
		rect = {
			x: clippingAncestor.x - visualOffsets.x,
			y: clippingAncestor.y - visualOffsets.y,
			width: clippingAncestor.width,
			height: clippingAncestor.height
		};
	}
	return rectToClientRect(rect);
}
function getClippingElementAncestors(element, cache) {
	const cachedResult = cache.get(element);
	if (cachedResult) return cachedResult;
	let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
	let lastKeptComputedStyle = null;
	const elementIsFixed = getComputedStyle$1(element).position === "fixed";
	let currentNode = elementIsFixed ? getParentNode(element) : element;
	while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
		const computedStyle = getComputedStyle$1(currentNode);
		const currentNodeIsContaining = isContainingBlock(currentNode);
		const lastPosition = lastKeptComputedStyle ? lastKeptComputedStyle.position : elementIsFixed ? "fixed" : "";
		if (!currentNodeIsContaining && (lastPosition === "fixed" || lastPosition === "absolute" && computedStyle.position === "static")) result = result.filter((ancestor) => ancestor !== currentNode);
		else lastKeptComputedStyle = computedStyle;
		currentNode = getParentNode(currentNode);
	}
	cache.set(element, result);
	return result;
}
function getClippingRect(_ref) {
	let { element, boundary, rootBoundary, strategy } = _ref;
	const clippingAncestors = [...boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary), rootBoundary];
	const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
	let top = firstRect.top;
	let right = firstRect.right;
	let bottom = firstRect.bottom;
	let left = firstRect.left;
	for (let i = 1; i < clippingAncestors.length; i++) {
		const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
		top = max(rect.top, top);
		right = min(rect.right, right);
		bottom = min(rect.bottom, bottom);
		left = max(rect.left, left);
	}
	return {
		width: right - left,
		height: bottom - top,
		x: left,
		y: top
	};
}
function getDimensions(element) {
	const { width, height } = getCssDimensions(element);
	return {
		width,
		height
	};
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	const documentElement = getDocumentElement(offsetParent);
	const isFixed = strategy === "fixed";
	const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	const offsets = createCoords(0);
	if (isOffsetParentAnElement || !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	if (!isOffsetParentAnElement && documentElement) offsets.x = getWindowScrollBarX(documentElement);
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
		y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
		width: rect.width,
		height: rect.height
	};
}
function isStaticPositioned(element) {
	return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
	if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") return null;
	if (polyfill) return polyfill(element);
	let rawOffsetParent = element.offsetParent;
	if (getDocumentElement(element) === rawOffsetParent) rawOffsetParent = rawOffsetParent.ownerDocument.body;
	return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
	const win = getWindow(element);
	if (isTopLayer(element)) return win;
	if (!isHTMLElement(element)) {
		let svgOffsetParent = getParentNode(element);
		while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
			if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) return svgOffsetParent;
			svgOffsetParent = getParentNode(svgOffsetParent);
		}
		return win;
	}
	let offsetParent = getTrueOffsetParent(element, polyfill);
	while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) offsetParent = getTrueOffsetParent(offsetParent, polyfill);
	if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) return win;
	return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
	const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
	const getDimensionsFn = this.getDimensions;
	const floatingDimensions = await getDimensionsFn(data.floating);
	return {
		reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
		floating: {
			x: 0,
			y: 0,
			width: floatingDimensions.width,
			height: floatingDimensions.height
		}
	};
};
function isRTL(element) {
	return getComputedStyle$1(element).direction === "rtl";
}
var platform$1 = {
	convertOffsetParentRelativeRectToViewportRelativeRect,
	getDocumentElement,
	getClippingRect,
	getOffsetParent,
	getElementRects,
	getClientRects,
	getDimensions,
	getScale,
	isElement,
	isRTL
};
function rectsAreEqual(a, b) {
	return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove, ancestorResize) {
	let io = null;
	let timeoutId;
	const root = getDocumentElement(element);
	function cleanup() {
		var _io;
		clearTimeout(timeoutId);
		(_io = io) == null || _io.disconnect();
		io = null;
	}
	function refresh(skip, threshold) {
		if (skip === void 0) skip = false;
		if (threshold === void 0) threshold = 1;
		cleanup();
		const elementRectForRootMargin = element.getBoundingClientRect();
		const { left, top, width, height } = elementRectForRootMargin;
		if (!skip) onMove();
		if (!width || !height) return;
		const insetTop = floor(top);
		const insetRight = floor(root.clientWidth - (left + width));
		const insetBottom = floor(root.clientHeight - (top + height));
		const insetLeft = floor(left);
		const options = {
			rootMargin: -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px",
			threshold: max(0, min(1, threshold)) || 1
		};
		let isFirstUpdate = true;
		function handleObserve(entries) {
			const ratio = entries[0].intersectionRatio;
			if (!rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) return refresh();
			if (ratio !== threshold) {
				if (!isFirstUpdate) return refresh();
				if (!ratio) timeoutId = setTimeout(() => {
					refresh(false, 1e-7);
				}, 1e3);
				else refresh(false, ratio);
			}
			isFirstUpdate = false;
		}
		try {
			io = new IntersectionObserver(handleObserve, {
				...options,
				root: root.ownerDocument
			});
		} catch (_e) {
			io = new IntersectionObserver(handleObserve, options);
		}
		io.observe(element);
	}
	const win = getWindow(element);
	const handleResize = () => refresh(ancestorResize);
	win.addEventListener("resize", handleResize);
	refresh(true);
	return () => {
		win.removeEventListener("resize", handleResize);
		cleanup();
	};
}
/**
* Automatically updates the position of the floating element when necessary.
* Should only be called when the floating element is mounted on the DOM or
* visible on the screen.
* @returns cleanup function that should be invoked when the floating element is
* removed from the DOM or hidden from the screen.
* @see https://floating-ui.com/docs/autoUpdate
*/
function autoUpdate(reference, floating, update, options) {
	if (options === void 0) options = {};
	const { ancestorScroll = true, ancestorResize = true, elementResize = typeof ResizeObserver === "function", layoutShift = typeof IntersectionObserver === "function", animationFrame = false } = options;
	const referenceEl = unwrapElement(reference);
	const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
	ancestors.forEach((ancestor) => {
		ancestorScroll && ancestor.addEventListener("scroll", update);
		ancestorResize && ancestor.addEventListener("resize", update);
	});
	const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update, ancestorResize) : null;
	let reobserveFrame = -1;
	let resizeObserver = null;
	if (elementResize) {
		resizeObserver = new ResizeObserver((_ref) => {
			let [firstEntry] = _ref;
			if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
				resizeObserver.unobserve(floating);
				cancelAnimationFrame(reobserveFrame);
				reobserveFrame = requestAnimationFrame(() => {
					var _resizeObserver;
					(_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
				});
			}
			update();
		});
		if (referenceEl && !animationFrame) resizeObserver.observe(referenceEl);
		if (floating) resizeObserver.observe(floating);
	}
	let frameId;
	let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
	if (animationFrame) frameLoop();
	function frameLoop() {
		const nextRefRect = getBoundingClientRect(reference);
		if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) update();
		prevRefRect = nextRefRect;
		frameId = requestAnimationFrame(frameLoop);
	}
	update();
	return () => {
		var _resizeObserver2;
		ancestors.forEach((ancestor) => {
			ancestorScroll && ancestor.removeEventListener("scroll", update);
			ancestorResize && ancestor.removeEventListener("resize", update);
		});
		cleanupIo?.();
		(_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
		resizeObserver = null;
		if (animationFrame) cancelAnimationFrame(frameId);
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset$1 = offset$2;
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift$1 = shift$2;
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip$1 = flip$2;
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size$1 = size$2;
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift$1 = limitShift$2;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*/
var computePosition = (reference, floating, options) => {
	const cache = /* @__PURE__ */ new Map();
	const mergedOptions = options != null ? options : {};
	const platformWithCache = {
		...platform$1,
		...mergedOptions.platform,
		_c: cache
	};
	return computePosition$1(reference, floating, {
		...mergedOptions,
		platform: platformWithCache
	});
};
var index = typeof document !== "undefined" ? import_react.useLayoutEffect : function noop() {};
function deepEqual(a, b) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (typeof a === "function" && a.toString() === b.toString()) return true;
	let length;
	let i;
	let keys;
	if (a && b && typeof a === "object") {
		if (Array.isArray(a)) {
			length = a.length;
			if (length !== b.length) return false;
			for (i = length; i-- !== 0;) if (!deepEqual(a[i], b[i])) return false;
			return true;
		}
		keys = Object.keys(a);
		length = keys.length;
		if (length !== Object.keys(b).length) return false;
		for (i = length; i-- !== 0;) if (!{}.hasOwnProperty.call(b, keys[i])) return false;
		for (i = length; i-- !== 0;) {
			const key = keys[i];
			if (key === "_owner" && a.$$typeof) continue;
			if (!deepEqual(a[key], b[key])) return false;
		}
		return true;
	}
	return a !== a && b !== b;
}
function getDPR(element) {
	if (typeof window === "undefined") return 1;
	return (element.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function roundByDPR(element, value) {
	const dpr = getDPR(element);
	return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
	const ref = import_react.useRef(value);
	index(() => {
		ref.current = value;
	});
	return ref;
}
/**
* Provides data to position a floating element.
* @see https://floating-ui.com/docs/useFloating
*/
function useFloating(options) {
	if (options === void 0) options = {};
	const { placement = "bottom", strategy = "absolute", middleware = [], platform, elements: { reference: externalReference, floating: externalFloating } = {}, transform = true, whileElementsMounted, open } = options;
	const [data, setData] = import_react.useState({
		x: 0,
		y: 0,
		strategy,
		placement,
		middlewareData: {},
		isPositioned: false
	});
	const [latestMiddleware, setLatestMiddleware] = import_react.useState(middleware);
	if (!deepEqual(latestMiddleware, middleware)) setLatestMiddleware(middleware);
	const [_reference, _setReference] = import_react.useState(null);
	const [_floating, _setFloating] = import_react.useState(null);
	const setReference = import_react.useCallback((node) => {
		if (node !== referenceRef.current) {
			referenceRef.current = node;
			_setReference(node);
		}
	}, []);
	const setFloating = import_react.useCallback((node) => {
		if (node !== floatingRef.current) {
			floatingRef.current = node;
			_setFloating(node);
		}
	}, []);
	const referenceEl = externalReference || _reference;
	const floatingEl = externalFloating || _floating;
	const referenceRef = import_react.useRef(null);
	const floatingRef = import_react.useRef(null);
	const dataRef = import_react.useRef(data);
	const hasWhileElementsMounted = whileElementsMounted != null;
	const whileElementsMountedRef = useLatestRef(whileElementsMounted);
	const platformRef = useLatestRef(platform);
	const openRef = useLatestRef(open);
	const update = import_react.useCallback(() => {
		if (!referenceRef.current || !floatingRef.current) return;
		const config = {
			placement,
			strategy,
			middleware: latestMiddleware
		};
		if (platformRef.current) config.platform = platformRef.current;
		computePosition(referenceRef.current, floatingRef.current, config).then((data) => {
			const fullData = {
				...data,
				isPositioned: openRef.current !== false
			};
			if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
				dataRef.current = fullData;
				import_react_dom.flushSync(() => {
					setData(fullData);
				});
			}
		});
	}, [
		latestMiddleware,
		placement,
		strategy,
		platformRef,
		openRef
	]);
	index(() => {
		if (open === false && dataRef.current.isPositioned) {
			dataRef.current.isPositioned = false;
			setData((data) => ({
				...data,
				isPositioned: false
			}));
		}
	}, [open]);
	const isMountedRef = import_react.useRef(false);
	index(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	}, []);
	index(() => {
		if (referenceEl) referenceRef.current = referenceEl;
		if (floatingEl) floatingRef.current = floatingEl;
		if (referenceEl && floatingEl) {
			if (whileElementsMountedRef.current) return whileElementsMountedRef.current(referenceEl, floatingEl, update);
			update();
		}
	}, [
		referenceEl,
		floatingEl,
		update,
		whileElementsMountedRef,
		hasWhileElementsMounted
	]);
	const refs = import_react.useMemo(() => ({
		reference: referenceRef,
		floating: floatingRef,
		setReference,
		setFloating
	}), [setReference, setFloating]);
	const elements = import_react.useMemo(() => ({
		reference: referenceEl,
		floating: floatingEl
	}), [referenceEl, floatingEl]);
	const floatingStyles = import_react.useMemo(() => {
		const initialStyles = {
			position: strategy,
			left: 0,
			top: 0
		};
		if (!elements.floating) return initialStyles;
		const x = roundByDPR(elements.floating, data.x);
		const y = roundByDPR(elements.floating, data.y);
		if (transform) return {
			...initialStyles,
			transform: "translate(" + x + "px, " + y + "px)",
			...getDPR(elements.floating) >= 1.5 && { willChange: "transform" }
		};
		return {
			position: strategy,
			left: x,
			top: y
		};
	}, [
		strategy,
		transform,
		elements.floating,
		data.x,
		data.y
	]);
	return import_react.useMemo(() => ({
		...data,
		update,
		refs,
		elements,
		floatingStyles
	}), [
		data,
		update,
		refs,
		elements,
		floatingStyles
	]);
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset = (options, deps) => {
	const result = offset$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift = (options, deps) => {
	const result = shift$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift = (options, deps) => {
	return {
		fn: limitShift$1(options).fn,
		options: [options, deps]
	};
};
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip = (options, deps) => {
	const result = flip$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size = (options, deps) => {
	const result = size$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/vendor-utils-io8z5lsfxq8m2dcc.js
/**
* Reads `navigator.userAgent` / `navigator.platform` (legacy but universally
* supported) into a normalized shape. In development, prefers the modern
* `navigator.userAgentData` API on Chromium to avoid DevTools warnings about
* the deprecated reads; that branch is dead-code-eliminated in production
* builds to keep the bundle small.
*
* Returns empty/zero values when `navigator` is undefined (SSR), so every
* derived flag safely evaluates to `false`.
*/
function readRawData() {
	if (typeof navigator === "undefined") return {
		userAgent: "",
		platform: "",
		maxTouchPoints: 0
	};
	{
		const uaData = navigator.userAgentData;
		if (uaData && Array.isArray(uaData.brands)) return {
			userAgent: uaData.brands.map(({ brand, version }) => `${brand}/${version}`).join(" "),
			platform: uaData.platform ?? navigator.platform ?? "",
			maxTouchPoints: navigator.maxTouchPoints ?? 0
		};
	}
	return {
		userAgent: navigator.userAgent,
		platform: navigator.platform ?? "",
		maxTouchPoints: navigator.maxTouchPoints ?? 0
	};
}
var { userAgent, platform, maxTouchPoints } = readRawData();
var lowerUserAgent = userAgent.toLowerCase();
var lowerPlatform = platform.toLowerCase();
/** iPhone, iPad (including iPadOS 13+ reporting as macOS), iPod. */
var ios = /^i(os$|p)/.test(lowerPlatform) || lowerPlatform === "macintel" && maxTouchPoints > 1;
/** Android phones, tablets, and embedded Android browsers. */
var ANDROID_STRING = "android";
var android = lowerPlatform === ANDROID_STRING || lowerUserAgent.includes(ANDROID_STRING);
/** macOS desktop. Excludes iPadOS, which reports as `MacIntel`. */
var mac = !ios && lowerPlatform.startsWith("mac");
lowerPlatform.startsWith("win");
!android && /^(linux|chrome os)/.test(lowerPlatform);
/** Any Apple OS (`mac || ios`). */
var apple = mac || ios;
/** Running in jsdom or HappyDOM (used by unit tests). */
var jsdom = /jsdom|happydom/.test(lowerUserAgent);
function stopEvent(event) {
	event.preventDefault();
	event.stopPropagation();
}
function isReactEvent(event) {
	return "nativeEvent" in event;
}
function isVirtualClick(event) {
	if (event.pointerType === "" && event.isTrusted) return true;
	if (android && event.pointerType) return event.type === "click" && event.buttons === 1;
	return event.detail === 0 && !event.pointerType;
}
function isVirtualPointerEvent(event) {
	if (jsdom) return false;
	return !android && event.width === 0 && event.height === 0 || event.type === "pointerdown" && event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "mouse" && (android || event.buttons === 0) || event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "touch";
}
function isMouseLikePointerType(pointerType, strict) {
	const values = ["mouse", "pen"];
	if (!strict) values.push("", void 0);
	return values.includes(pointerType);
}
function isClickLikeEvent(event) {
	const type = event.type;
	return type === "click" || type === "mousedown" || type === "keydown" || type === "keyup";
}
function activeElement(doc) {
	let element = doc.activeElement;
	while (element?.shadowRoot?.activeElement != null) element = element.shadowRoot.activeElement;
	return element;
}
function contains(parent, child) {
	if (!parent || !child) return false;
	const rootNode = child.getRootNode?.();
	if (parent.contains(child)) return true;
	if (rootNode && isShadowRoot(rootNode)) {
		let next = child;
		while (next) {
			if (parent === next) return true;
			next = next.parentNode || next.host;
		}
	}
	return false;
}
/**
* Finds the closest matching element in the composed tree, crossing slots and shadow roots.
* `:scope` is not supported.
*/
function closest(node, selector) {
	let current = node;
	while (current) {
		if (isElement(current) && current.matches(selector)) return current;
		current = current.assignedSlot ?? current.parentNode ?? (isShadowRoot(current) ? current.host : null);
	}
	return null;
}
function getTarget(event) {
	if ("composedPath" in event) return event.composedPath()[0] ?? event.target;
	return event.target;
}
var FOCUSABLE_ATTRIBUTE = "data-base-ui-focusable";
var TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
var ARROW_LEFT = "ArrowLeft";
var ARROW_RIGHT = "ArrowRight";
var ARROW_UP = "ArrowUp";
var ARROW_DOWN = "ArrowDown";
/**
* Present when the component begins animating in.
*/
var startingStyle$1 = "data-starting-style";
/**
* Present when the component is animating out.
*/
var endingStyle$1 = "data-ending-style";
var STARTING_HOOK = { [startingStyle$1]: "" };
var ENDING_HOOK = { [endingStyle$1]: "" };
var transitionStatusMapping = { transitionStatus(value) {
	if (value === "starting") return STARTING_HOOK;
	if (value === "ending") return ENDING_HOOK;
	return null;
} };
/**
* Present when the popup is open.
*/
var open = "data-open";
/**
* Present when the popup is closed.
*/
var closed = "data-closed";
/**
* Present when the anchor is hidden.
*/
var anchorHidden = "data-anchor-hidden";
/**
* Present when the popup is open.
*/
var popupOpen$1 = "data-popup-open";
/**
* Present when a pressable trigger is pressed.
*/
var pressed = "data-pressed";
var TRIGGER_HOOK = { [popupOpen$1]: "" };
var PRESSABLE_TRIGGER_HOOK = {
	[popupOpen$1]: "",
	[pressed]: ""
};
var POPUP_OPEN_HOOK = { [open]: "" };
var POPUP_CLOSED_HOOK = { [closed]: "" };
var ANCHOR_HIDDEN_HOOK = { [anchorHidden]: "" };
var triggerOpenStateMapping = { open(value) {
	if (value) return TRIGGER_HOOK;
	return null;
} };
var pressableTriggerOpenStateMapping = { open(value) {
	if (value) return PRESSABLE_TRIGGER_HOOK;
	return null;
} };
var popupStateMapping = {
	open(value) {
		if (value) return POPUP_OPEN_HOOK;
		return POPUP_CLOSED_HOOK;
	},
	anchorHidden(value) {
		if (value) return ANCHOR_HIDDEN_HOOK;
		return null;
	}
};
var popupTransitionStateMapping = {
	...popupStateMapping,
	...transitionStatusMapping
};
/**
* Present when the trigger is disabled, either by the `disabled` prop or by a parent `<Tooltip.Root>` component.
*/
var triggerDisabled = "data-trigger-disabled";
function isTargetInsideEnabledTrigger(target, triggerElements) {
	if (!isElement(target)) return false;
	const targetElement = target;
	if (triggerElements.hasElement(targetElement)) return !targetElement.hasAttribute(triggerDisabled);
	for (const [, trigger] of triggerElements.entries()) if (contains(trigger, targetElement)) return !trigger.hasAttribute(triggerDisabled);
	return false;
}
function isEventTargetWithin(event, node) {
	if (node == null) return false;
	if ("composedPath" in event) return event.composedPath().includes(node);
	const eventAgain = event;
	return eventAgain.target != null && node.contains(eventAgain.target);
}
function isRootElement(element) {
	return element.matches("html,body");
}
function isTypeableElement(element) {
	return isHTMLElement(element) && element.matches("input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])");
}
function isInteractiveElement(element) {
	return closest(element, `button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${TYPEABLE_SELECTOR}`) != null;
}
function isTypeableCombobox(element) {
	if (!element) return false;
	return element.getAttribute("role") === "combobox" && isTypeableElement(element);
}
function matchesFocusVisible(element) {
	if (!element || jsdom) return true;
	try {
		return element.matches(":focus-visible");
	} catch (_e) {
		return true;
	}
}
function getFloatingFocusElement(floatingElement) {
	if (!floatingElement) return null;
	return floatingElement.hasAttribute("data-base-ui-focusable") ? floatingElement : floatingElement.querySelector(`[data-base-ui-focusable]`) || floatingElement;
}
function ownerDocument(node) {
	return node?.ownerDocument || document;
}
function isIndexOutOfListBounds(list, index) {
	return index < 0 || index >= list.length;
}
function getMinListIndex(listRef, disabledIndices) {
	return findNonDisabledListIndex(listRef.current, { disabledIndices });
}
function getMaxListIndex(listRef, disabledIndices) {
	return findNonDisabledListIndex(listRef.current, {
		decrement: true,
		startingIndex: listRef.current.length,
		disabledIndices
	});
}
/**
* The index one arrow step moves the highlight to from `currentIndex`, or `-1` when the step
* leaves the list. `wrapped` reports a jump from one end of the list to the other.
*/
function getNextListIndex(list, currentIndex, options) {
	const { decrement, loopFocus, allowEscape, disabledIndices, minIndex, maxIndex } = options;
	const step = () => findNonDisabledListIndex(list, {
		startingIndex: currentIndex,
		decrement,
		disabledIndices
	});
	let index;
	let wrapped = false;
	if (!loopFocus) index = decrement ? Math.max(minIndex, step()) : Math.min(maxIndex, step());
	else if (decrement ? currentIndex <= minIndex : currentIndex >= maxIndex) {
		const outside = decrement ? -1 : list.length;
		if (allowEscape && currentIndex !== outside) index = -1;
		else {
			index = decrement ? maxIndex : minIndex;
			wrapped = true;
		}
	} else index = step();
	return {
		index: isIndexOutOfListBounds(list, index) ? -1 : index,
		wrapped
	};
}
function findNonDisabledListIndex(list, { startingIndex = -1, decrement = false, disabledIndices, amount = 1 } = {}) {
	let index = startingIndex;
	do
		index += decrement ? -amount : amount;
	while (index >= 0 && index <= list.length - 1 && isListIndexDisabled(list, index, disabledIndices));
	return index;
}
function isListIndexDisabled(list, index, disabledIndices) {
	if (typeof disabledIndices === "function" ? disabledIndices(index) : disabledIndices?.includes(index) ?? false) return true;
	const element = list[index];
	if (!element) return false;
	if (!isElementVisible(element)) return true;
	if (element.matches(":disabled")) return true;
	return !disabledIndices && (element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true");
}
function isHiddenByStyles(styles) {
	return styles.visibility === "hidden" || styles.visibility === "collapse";
}
function isElementVisible(element, styles = element ? getComputedStyle$1(element) : null) {
	if (!element || !element.isConnected || !styles || isHiddenByStyles(styles)) return false;
	if (typeof element.checkVisibility === "function") return element.checkVisibility();
	return styles.display !== "none" && styles.display !== "contents";
}
var CANDIDATE_SELECTOR = "a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable=\"false\"]),audio[controls],video[controls]";
function getParentElement(element) {
	const assignedSlot = element.assignedSlot;
	if (assignedSlot) return assignedSlot;
	if (element.parentElement) return element.parentElement;
	const rootNode = element.getRootNode();
	return isShadowRoot(rootNode) ? rootNode.host : null;
}
function getDetailsSummary(details) {
	for (const child of Array.from(details.children)) if (getNodeName(child) === "summary") return child;
	return null;
}
function isWithinOpenDetailsSummary(element, details) {
	const summary = getDetailsSummary(details);
	return !!summary && (element === summary || contains(summary, element));
}
function isFocusableCandidate(element) {
	const nodeName = element ? getNodeName(element) : "";
	return element != null && element.matches(CANDIDATE_SELECTOR) && (nodeName !== "summary" || element.parentElement != null && getNodeName(element.parentElement) === "details" && getDetailsSummary(element.parentElement) === element) && (nodeName !== "details" || getDetailsSummary(element) == null) && (nodeName !== "input" || element.type !== "hidden");
}
function isFocusableElement(element) {
	if (!isFocusableCandidate(element) || !element.isConnected || element.matches(":disabled")) return false;
	for (let current = element; current; current = getParentElement(current)) {
		const isAncestor = current !== element;
		const isSlot = getNodeName(current) === "slot";
		if (current.hasAttribute("inert")) return false;
		if (isAncestor && getNodeName(current) === "details" && !current.open && !isWithinOpenDetailsSummary(element, current) || current.hasAttribute("hidden") || !isSlot && !isVisibleInTabbableTree(current, isAncestor)) return false;
	}
	return true;
}
function isVisibleInTabbableTree(element, isAncestor) {
	const styles = getComputedStyle$1(element);
	if (!isAncestor) return isElementVisible(element, styles);
	return styles.display !== "none";
}
function getTabIndex(element) {
	const tabIndex = element.tabIndex;
	if (tabIndex < 0) {
		const nodeName = getNodeName(element);
		if (nodeName === "details" || nodeName === "audio" || nodeName === "video" || isHTMLElement(element) && element.isContentEditable) return 0;
	}
	return tabIndex;
}
function getNamedRadioInput(element) {
	if (getNodeName(element) !== "input") return null;
	const input = element;
	return input.type === "radio" && input.name !== "" ? input : null;
}
function isTabbableRadio(element, candidates) {
	const input = getNamedRadioInput(element);
	if (!input) return true;
	const checkedRadio = candidates.find((candidate) => {
		const radio = getNamedRadioInput(candidate);
		return radio?.name === input.name && radio.form === input.form && radio.checked;
	});
	if (checkedRadio) return checkedRadio === input;
	return candidates.find((candidate) => {
		const radio = getNamedRadioInput(candidate);
		return radio?.name === input.name && radio.form === input.form;
	}) === input;
}
function getComposedChildren(container) {
	if (isHTMLElement(container) && getNodeName(container) === "slot") {
		const assignedElements = container.assignedElements({ flatten: true });
		if (assignedElements.length > 0) return assignedElements;
	}
	if (isHTMLElement(container) && container.shadowRoot) return Array.from(container.shadowRoot.children);
	return Array.from(container.children);
}
function appendCandidates(container, list) {
	getComposedChildren(container).forEach((child) => {
		if (isFocusableCandidate(child)) list.push(child);
		appendCandidates(child, list);
	});
}
function appendMatchingElements(container, selector, list) {
	getComposedChildren(container).forEach((child) => {
		if (isHTMLElement(child) && child.matches(selector)) list.push(child);
		appendMatchingElements(child, selector, list);
	});
}
function isTabbable(element) {
	return isFocusableElement(element) && getTabIndex(element) >= 0;
}
function focusable(container) {
	const candidates = [];
	appendCandidates(container, candidates);
	return candidates.filter(isFocusableElement);
}
function tabbable(container) {
	const candidates = focusable(container);
	return candidates.filter((element) => getTabIndex(element) >= 0 && isTabbableRadio(element, candidates));
}
function getTabbableIn(container, dir) {
	const list = tabbable(container);
	const len = list.length;
	if (len === 0) return;
	const active = activeElement(ownerDocument(container));
	const index = list.indexOf(active);
	return list[index === -1 ? dir === 1 ? 0 : len - 1 : index + dir];
}
function getNextTabbable(referenceElement) {
	return getTabbableIn(ownerDocument(referenceElement).body, 1) || referenceElement;
}
function getPreviousTabbable(referenceElement) {
	return getTabbableIn(ownerDocument(referenceElement).body, -1) || referenceElement;
}
function isOutsideEvent(event, container) {
	const containerElement = container || event.currentTarget;
	const relatedTarget = event.relatedTarget;
	return !relatedTarget || !contains(containerElement, relatedTarget);
}
function disableFocusInside(container) {
	tabbable(container).forEach((element) => {
		element.dataset.tabindex = element.getAttribute("tabindex") || "";
		element.setAttribute("tabindex", "-1");
	});
}
function enableFocusInside(container) {
	const elements = [];
	appendMatchingElements(container, "[data-tabindex]", elements);
	elements.forEach((element) => {
		const tabindex = element.dataset.tabindex;
		delete element.dataset.tabindex;
		if (tabindex) element.setAttribute("tabindex", tabindex);
		else element.removeAttribute("tabindex");
	});
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/engine-hzmefiqm63hu0c7i.js
/** WebKit: Safari, all iOS browsers, GNOME Web. Excludes Blink. */
var webkit = typeof CSS !== "undefined" && !!CSS.supports?.("-webkit-backdrop-filter:none");
!webkit && lowerUserAgent.includes("firefox");
!webkit && lowerUserAgent.includes("chrom");
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/createBaseUIEventDetails-nvee6bghv2reeqdb.js
/**
* Maps a change `reason` string to the corresponding native event type.
*/
/**
* Details of custom change events emitted by Base UI components.
*/
/**
* Details of custom generic events emitted by Base UI components.
*/
/** Highlight navigation uses mouse events for hover and pointer events for leaving an item. */
/**
* Creates a Base UI event details object with the given reason and utilities
* for preventing Base UI's internal event handling.
*/
function createChangeEventDetails(reason, event, trigger, customProperties) {
	let canceled = false;
	let allowPropagation = false;
	const custom = customProperties ?? EMPTY_OBJECT;
	return {
		reason,
		event: event ?? new Event("base-ui"),
		cancel() {
			canceled = true;
		},
		allowPropagation() {
			allowPropagation = true;
		},
		get isCanceled() {
			return canceled;
		},
		get isPropagationAllowed() {
			return allowPropagation;
		},
		trigger,
		...custom
	};
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/reason-parts-hssx64rmlxyn6gw5.js
var none = "none";
var triggerPress = "trigger-press";
var triggerHover = "trigger-hover";
var triggerFocus = "trigger-focus";
var outsidePress = "outside-press";
var itemPress = "item-press";
var closePress = "close-press";
var focusOut = "focus-out";
var escapeKey = "escape-key";
var listNavigation = "list-navigation";
var cancelOpen = "cancel-open";
var disabled = "disabled";
var imperativeAction = "imperative-action";
var windowResize = "window-resize";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/addEventListener-ku3x23446prmd1kz.js
/**
* Adds an event listener and returns a cleanup function to remove it.
*/
function addEventListener(target, type, listener, options) {
	target.addEventListener(type, listener, options);
	return () => {
		target.removeEventListener(type, listener, options);
	};
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/mergeCleanups-nw73c6jfwl5tyhw4.js
/**
* Combines multiple cleanup functions into a single cleanup function.
*/
function mergeCleanups(...cleanups) {
	return () => {
		for (let i = 0; i < cleanups.length; i += 1) {
			const cleanup = cleanups[i];
			if (cleanup) cleanup();
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useStableCallback-le5qgj6p9l04729n.js
var useInsertionEffect = SafeReact.useInsertionEffect;
var useSafeInsertionEffect = useInsertionEffect && useInsertionEffect !== SafeReact.useLayoutEffect ? useInsertionEffect : (fn) => fn();
/**
* Stabilizes the function passed so it's always the same between renders.
*
* The function becomes non-reactive to any values it captures.
* It can safely be passed as a dependency of `React.useMemo` and `React.useEffect` without re-triggering them if its captured values change.
*
* The function must only be called inside effects and event handlers, never during render (which throws an error).
*
* This hook is a more permissive version of React 19.2's `React.useEffectEvent` in that it can be passed through contexts and called in event handler props, not just effects.
*/
function useStableCallback(callback) {
	const stable = useRefWithInit(createStableCallback).current;
	stable.next = callback;
	useSafeInsertionEffect(stable.effect);
	return stable.trampoline;
}
function createStableCallback() {
	const stable = {
		next: void 0,
		callback: assertNotCalled,
		trampoline: (...args) => stable.callback?.(...args),
		effect: () => {
			stable.callback = stable.next;
		}
	};
	return stable;
}
function assertNotCalled() {
	throw new Error("Base UI: Cannot call an event handler while rendering.");
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/visuallyHidden-kzzs9hbe93is3rci.js
var visuallyHiddenBase = {
	clipPath: "inset(50%)",
	overflow: "hidden",
	whiteSpace: "nowrap",
	border: 0,
	padding: 0,
	width: 1,
	height: 1,
	margin: -1
};
var visuallyHidden = {
	...visuallyHiddenBase,
	position: "fixed",
	margin: 0,
	top: 0,
	left: 0
};
var visuallyHiddenInput = {
	...visuallyHiddenBase,
	position: "absolute"
};
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useId-82z8yqlmc1hy1c5t.js
/**
* Returns a function that forces a rerender.
*/
function useForcedRerendering() {
	const [, setState] = import_react.useState({});
	return import_react.useCallback(() => {
		setState({});
	}, []);
}
var globalId = 0;
function useGlobalId(idOverride, prefix = "mui") {
	const defaultId = import_react.useRef(void 0);
	const forceRerender = useForcedRerendering();
	const id = idOverride ?? defaultId.current;
	import_react.useEffect(() => {
		if (defaultId.current == null) {
			globalId += 1;
			defaultId.current = `${prefix}-${globalId}`;
			if (idOverride == null) forceRerender();
		}
	}, [
		idOverride,
		prefix,
		forceRerender
	]);
	return id;
}
var maybeReactUseId = SafeReact.useId;
/**
*
* @example <div id={useId()} />
* @param {string | undefined} idOverride overrides the generated id when provided
* @param {string | undefined} prefix prefixes the generated id when provided
* @returns {string | undefined}
*/
function useId$1(idOverride, prefix) {
	if (maybeReactUseId !== void 0) {
		const reactId = maybeReactUseId();
		return idOverride ?? (prefix ? `${prefix}-${reactId}` : reactId);
	}
	return useGlobalId(idOverride, prefix);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/FloatingTree-kiyzavvaum442o1s.js
function createEventEmitter() {
	const map = /* @__PURE__ */ new Map();
	return {
		emit(event, data) {
			map.get(event)?.forEach((listener) => listener(data));
		},
		on(event, listener) {
			if (!map.has(event)) map.set(event, /* @__PURE__ */ new Set());
			map.get(event).add(listener);
		},
		off(event, listener) {
			map.get(event)?.delete(listener);
		}
	};
}
var FloatingNodeContext = /*#__PURE__*/ import_react.createContext(null);
FloatingNodeContext.displayName = "FloatingNodeContext";
var FloatingTreeContext = /*#__PURE__*/ import_react.createContext(null);
FloatingTreeContext.displayName = "FloatingTreeContext";
var useFloatingParentNodeId = () => import_react.useContext(FloatingNodeContext)?.id || null;
/**
* Returns the nearest floating tree context, if available.
*/
var useFloatingTree = (externalTree) => {
	const contextTree = import_react.useContext(FloatingTreeContext);
	return externalTree ?? contextTree;
};
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/FloatingRootStore-men6ufp3a2b296fh.js
var hooks = [];
var currentInstance = void 0;
function getInstance() {
	return currentInstance;
}
function register(hook) {
	hooks.push(hook);
}
/**
* Wraps a component function to enable performance optimizations for internal hooks.
*
* **Performance Optimization:**
* Components wrapped with `fastComponent` have access to a shared "instance" context that enables
* specialized hook implementations to batch operations and reduce overhead. The wrapper creates a
* stable instance object that persists across renders, sets it as the current context, calls
* registered hooks before and after rendering, then clears the context. The primary benefit is
* with `useStore`, where multiple store subscriptions within the same component are collapsed into
* a single `useSyncExternalStore` subscription per store, significantly reducing re-render overhead.
* This optimization is only active on React 19+; on earlier versions `useStore` falls back to a
* separate subscription per call.
*
* **Requirements:**
* - The component function should follow standard React component patterns
* - `useStore` calls must keep a stable order and count across renders, as batched hooks are
*   matched by call index
* - Do not rely on the instance context outside of specialized hooks
*
* @param fn - The component function to wrap
* @returns A wrapped component with the same signature as the input function
*
* @example
* ```tsx
* // Wrapping a component to enable optimized useStore batching
* export const TooltipRoot = fastComponent(function TooltipRoot(props) {
*   // These useStore calls share a single subscription
*   const open = useStore(store, (state) => state.open);
*   const disabled = useStore(store, (state) => state.disabled);
*   const value = useStore(store, (state) => state.value);
*   // ...
* });
* ```
*/
function fastComponent(fn) {
	const FastComponent = (props, forwardedRef) => {
		const instance = useRefWithInit(createInstance).current;
		let result;
		try {
			currentInstance = instance;
			for (const hook of hooks) hook.before(instance);
			result = fn(props, forwardedRef);
			for (const hook of hooks) hook.after(instance);
			instance.didInitialize = true;
		} finally {
			currentInstance = void 0;
		}
		return result;
	};
	FastComponent.displayName = fn.displayName || fn.name;
	return FastComponent;
}
/**
* Wraps a component function with ref forwarding to enable performance optimizations for internal hooks.
*
* This is a convenience wrapper that combines `fastComponent` with `React.forwardRef`, enabling
* both performance optimizations and proper ref forwarding. See `fastComponent` for details on
* the performance benefits.
*
* @param fn - The component function that accepts props and a forwarded ref
* @returns A wrapped component with ref forwarding enabled
*
* @example
* ```tsx
* // Wrapping a component with ref forwarding and optimized hooks
* export const TooltipTrigger = fastComponentRef(function TooltipTrigger(
*   props,
*   forwardedRef
* ) {
*   const store = useContext(TooltipContext);
*   const open = useStore(store, (state) => state.open);
*   // ... component logic with ref
*   return <button ref={forwardedRef} {...props} />;
* });
* ```
*/
function fastComponentRef(fn) {
	return /*#__PURE__*/ import_react.forwardRef(fastComponent(fn));
}
function createInstance() {
	return { didInitialize: false };
}
/**
* The user *may* be using VoiceOver — actual activation is not detectable.
* True on any Apple platform (macOS, iOS, iPadOS).
*/
var voiceOver = apple;
/**
* @internal
*/
var FocusGuard = /*#__PURE__*/ import_react.forwardRef(function FocusGuard(props, ref) {
	const [role, setRole] = import_react.useState();
	useIsoLayoutEffect(() => {
		if (voiceOver && webkit) setRole("button");
	}, []);
	const restProps = {
		tabIndex: 0,
		role
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
		...props,
		ref,
		style: visuallyHidden,
		"aria-hidden": role ? void 0 : true,
		...restProps,
		"data-base-ui-focus-guard": ""
	});
});
FocusGuard.displayName = "FocusGuard";
function createAttribute(name) {
	return `data-base-ui-${name}`;
}
var DISABLED_TRANSITIONS_STYLE = { style: { transition: "none" } };
var CLICK_TRIGGER_IDENTIFIER = "data-base-ui-click-trigger";
var BASE_UI_SWIPE_IGNORE_ATTRIBUTE = "data-base-ui-swipe-ignore";
var LEGACY_SWIPE_IGNORE_ATTRIBUTE = "data-swipe-ignore";
`${BASE_UI_SWIPE_IGNORE_ATTRIBUTE}`;
`${LEGACY_SWIPE_IGNORE_ATTRIBUTE}`;
/**
* Used for dropdowns that usually strictly prefer top/bottom placements and
* use `var(--available-height)` to limit their height.
*/
var DROPDOWN_COLLISION_AVOIDANCE = { fallbackAxisSide: "none" };
/**
* Used by regular popups that usually aren't scrollable and are allowed to
* freely flip to any axis of placement.
*/
var POPUP_COLLISION_AVOIDANCE = { fallbackAxisSide: "end" };
/**
* Special visually hidden styles for the aria-owns owner element to ensure owned element
* accessibility in iOS/Safari/VoiceControl.
* The owner element is an empty span, so most of the common visually hidden styles are not needed.
* @see https://github.com/floating-ui/floating-ui/issues/3403
*/
var ownerVisuallyHidden = {
	clipPath: "inset(50%)",
	position: "fixed",
	top: 0,
	left: 0
};
var PortalContext = /*#__PURE__*/ import_react.createContext(null);
PortalContext.displayName = "PortalContext";
var usePortalContext = () => import_react.useContext(PortalContext);
var attr = createAttribute("portal");
function useFloatingPortalNode(props = {}) {
	const { ref, container: containerProp, componentProps = EMPTY_OBJECT, elementProps } = props;
	const uniqueId = useId$1();
	const parentPortalNode = usePortalContext()?.portalNode;
	const [containerElement, setContainerElement] = import_react.useState(null);
	const [portalNode, setPortalNode] = import_react.useState(null);
	const setPortalNodeRef = useStableCallback((node) => {
		if (node !== null) setPortalNode(node);
	});
	const containerRef = import_react.useRef(null);
	useIsoLayoutEffect(() => {
		if (containerProp === null) {
			if (containerRef.current) {
				containerRef.current = null;
				setPortalNode(null);
				setContainerElement(null);
			}
			return;
		}
		const resolvedContainer = (containerProp && (isNode(containerProp) ? containerProp : containerProp.current)) ?? parentPortalNode ?? document.body;
		if (resolvedContainer == null) {
			if (containerRef.current) {
				containerRef.current = null;
				setPortalNode(null);
				setContainerElement(null);
			}
			return;
		}
		if (containerRef.current !== resolvedContainer) {
			containerRef.current = resolvedContainer;
			setPortalNode(null);
			setContainerElement(resolvedContainer);
		}
	}, [containerProp, parentPortalNode]);
	const portalElement = useRenderElement("div", componentProps, {
		ref: [ref, setPortalNodeRef],
		props: [{
			id: uniqueId,
			[attr]: ""
		}, elementProps]
	});
	const portalSubtree = containerElement && portalElement ? /*#__PURE__*/ import_react_dom.createPortal(portalElement, containerElement) : null;
	return {
		node: portalNode,
		nodeId: /*#__PURE__*/ import_react.isValidElement(portalElement) ? portalElement.props.id : void 0,
		subtree: portalSubtree
	};
}
/**
* Portals the floating element into a given container element — by default,
* outside of the app root and into the body.
* This is necessary to ensure the floating element can appear outside any
* potential parent containers that cause clipping (such as `overflow: hidden`),
* while retaining its location in the React tree.
* @see https://floating-ui.com/docs/FloatingPortal
* @internal
*/
var FloatingPortal = /*#__PURE__*/ import_react.forwardRef(function FloatingPortal(componentProps, forwardedRef) {
	const { render, className, style, children, container, portalOwnerRole, ...elementProps } = componentProps;
	const { node: portalNode, nodeId: portalNodeId, subtree: portalSubtree } = useFloatingPortalNode({
		container,
		ref: forwardedRef,
		componentProps,
		elementProps
	});
	const beforeOutsideRef = import_react.useRef(null);
	const afterOutsideRef = import_react.useRef(null);
	const beforeInsideRef = import_react.useRef(null);
	const afterInsideRef = import_react.useRef(null);
	const [focusManagerState, setFocusManagerState] = import_react.useState(null);
	const focusInsideDisabledRef = import_react.useRef(false);
	const modal = focusManagerState?.modal;
	const open = focusManagerState?.open;
	const shouldRenderGuards = !!focusManagerState && !focusManagerState.modal && focusManagerState.open && !!portalNode;
	import_react.useEffect(() => {
		if (!portalNode || modal) return;
		function onFocus(event) {
			if (portalNode && event.relatedTarget && isOutsideEvent(event)) if (event.type === "focusin") {
				if (focusInsideDisabledRef.current) {
					enableFocusInside(portalNode);
					focusInsideDisabledRef.current = false;
				}
			} else {
				disableFocusInside(portalNode);
				focusInsideDisabledRef.current = true;
			}
		}
		return mergeCleanups(addEventListener(portalNode, "focusin", onFocus, true), addEventListener(portalNode, "focusout", onFocus, true));
	}, [portalNode, modal]);
	useIsoLayoutEffect(() => {
		if (!portalNode || open !== true || !focusInsideDisabledRef.current) return;
		enableFocusInside(portalNode);
		focusInsideDisabledRef.current = false;
	}, [open, portalNode]);
	const portalContextValue = import_react.useMemo(() => ({
		beforeOutsideRef,
		afterOutsideRef,
		beforeInsideRef,
		afterInsideRef,
		portalNode,
		setFocusManagerState
	}), [portalNode]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [portalSubtree, /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PortalContext.Provider, {
		value: portalContextValue,
		children: [
			shouldRenderGuards && portalNode && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusGuard, {
				"data-type": "outside",
				ref: beforeOutsideRef,
				onFocus: (event) => {
					if (isOutsideEvent(event, portalNode)) beforeInsideRef.current?.focus();
					else getPreviousTabbable(focusManagerState ? focusManagerState.domReference : null)?.focus();
				}
			}),
			shouldRenderGuards && portalNode && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
				role: portalOwnerRole,
				"aria-owns": portalNodeId,
				style: ownerVisuallyHidden
			}),
			portalNode && /*#__PURE__*/ import_react_dom.createPortal(children, portalNode),
			shouldRenderGuards && portalNode && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusGuard, {
				"data-type": "outside",
				ref: afterOutsideRef,
				onFocus: (event) => {
					if (isOutsideEvent(event, portalNode)) afterInsideRef.current?.focus();
					else {
						getNextTabbable(focusManagerState ? focusManagerState.domReference : null)?.focus();
						if (focusManagerState?.closeOnFocusOut) focusManagerState?.onOpenChange(false, createChangeEventDetails("focus-out", event.nativeEvent));
					}
				}
			})
		]
	})] });
});
FloatingPortal.displayName = "FloatingPortal";
/**
* Development-only reverse index of element to registered id, keyed by the owning map.
*
* Registration would otherwise have to scan every entry to detect an element claimed by two ids,
* making the mount of many triggers sharing one handle quadratic. Kept module-scoped, lazily
* initialized, and read only from `process.env.NODE_ENV` guards so production builds drop it along
* with the checks.
*/
var devElementIdsByMap;
function getDevElementIds(map) {
	devElementIdsByMap ??= /* @__PURE__ */ new WeakMap();
	let elementIds = devElementIdsByMap.get(map);
	if (!elementIds) {
		elementIds = /* @__PURE__ */ new WeakMap();
		devElementIdsByMap.set(map, elementIds);
	}
	return elementIds;
}
/**
* Data structure to keep track of popup trigger elements by their IDs.
*
* Element lookups iterate the id map rather than maintaining a parallel Set. Registration is O(1),
* while `hasElement` and `hasMatchingElement` are linear in the number of triggers.
*/
var PopupTriggerMap = class {
	idMap = /* @__PURE__ */ new Map();
	/**
	* Adds a trigger element with the given ID.
	*
	* Note: The provided element is assumed to not be registered under multiple IDs.
	*/
	add(id, element) {
		{
			const elementIds = getDevElementIds(this);
			const existingId = elementIds.get(element);
			if (existingId !== void 0 && existingId !== id) throw new Error("Base UI: A trigger element cannot be registered under multiple IDs in PopupTriggerMap.");
			const previousElement = this.idMap.get(id);
			if (previousElement !== void 0 && previousElement !== element) elementIds.delete(previousElement);
			elementIds.set(element, id);
		}
		this.idMap.set(id, element);
	}
	/**
	* Removes the trigger element with the given ID.
	*/
	delete(id) {
		{
			const element = this.idMap.get(id);
			if (element !== void 0) devElementIdsByMap?.get(this)?.delete(element);
		}
		this.idMap.delete(id);
	}
	/**
	* Whether the given element is registered as a trigger.
	*/
	hasElement(element) {
		for (const registered of this.idMap.values()) if (registered === element) return true;
		return false;
	}
	/**
	* Whether there is a registered trigger element matching the given predicate.
	*/
	hasMatchingElement(predicate) {
		for (const element of this.idMap.values()) if (predicate(element)) return true;
		return false;
	}
	/**
	* Returns the trigger element associated with the given ID, or undefined if no such element exists.
	*/
	getById(id) {
		return this.idMap.get(id);
	}
	/**
	* Returns an iterable of all registered trigger entries, where each entry is a tuple of [id, element].
	*/
	entries() {
		return this.idMap.entries();
	}
	/**
	* Returns an iterable of all registered trigger elements.
	*/
	elements() {
		return this.idMap.values();
	}
	/**
	* Returns the number of registered trigger elements.
	*/
	get size() {
		return this.idMap.size;
	}
};
var useStoreImplementation = isReactVersionAtLeast(19) ? useStoreFast : useStoreLegacy;
function useStore(store, selector, a1, a2, a3) {
	return useStoreImplementation(store, selector, a1, a2, a3);
}
function useStoreR19(store, selector, a1, a2, a3) {
	const getSelection = import_react.useCallback(() => selector(store.getSnapshot(), a1, a2, a3), [
		store,
		selector,
		a1,
		a2,
		a3
	]);
	return (0, import_shim.useSyncExternalStore)(store.subscribe, getSelection, getSelection);
}
register({
	before(instance) {
		instance.syncIndex = 0;
		if (!instance.didInitialize) {
			instance.syncTick = 1;
			instance.syncHooks = [];
			instance.didChangeStore = true;
			instance.getSnapshot = () => {
				let didChange = false;
				for (let i = 0; i < instance.syncHooks.length; i += 1) {
					const hook = instance.syncHooks[i];
					const value = hook.selector(hook.store.state, hook.a1, hook.a2, hook.a3);
					if (!Object.is(hook.value, value)) {
						didChange = true;
						hook.value = value;
					}
				}
				if (didChange) instance.syncTick += 1;
				return instance.syncTick;
			};
		}
	},
	after(instance) {
		if (instance.syncHooks.length > 0) {
			if (instance.didChangeStore) {
				instance.didChangeStore = false;
				instance.subscribe = (onStoreChange) => {
					const stores = /* @__PURE__ */ new Set();
					for (const hook of instance.syncHooks) stores.add(hook.store);
					const unsubscribes = [];
					for (const store of stores) unsubscribes.push(store.subscribe(onStoreChange));
					return () => {
						for (const unsubscribe of unsubscribes) unsubscribe();
					};
				};
			}
			(0, import_shim.useSyncExternalStore)(instance.subscribe, instance.getSnapshot, instance.getSnapshot);
		}
	}
});
function useStoreFast(store, selector, a1, a2, a3) {
	const instance = getInstance();
	if (!instance) return useStoreR19(store, selector, a1, a2, a3);
	const index = instance.syncIndex;
	instance.syncIndex += 1;
	let hook;
	if (!instance.didInitialize) {
		hook = {
			store,
			selector,
			a1,
			a2,
			a3,
			value: selector(store.getSnapshot(), a1, a2, a3)
		};
		instance.syncHooks.push(hook);
	} else {
		hook = instance.syncHooks[index];
		if (hook.store !== store || hook.selector !== selector || !Object.is(hook.a1, a1) || !Object.is(hook.a2, a2) || !Object.is(hook.a3, a3)) {
			if (hook.store !== store) instance.didChangeStore = true;
			hook.store = store;
			hook.selector = selector;
			hook.a1 = a1;
			hook.a2 = a2;
			hook.a3 = a3;
			hook.value = selector(store.getSnapshot(), a1, a2, a3);
		}
	}
	return hook.value;
}
function useStoreLegacy(store, selector, a1, a2, a3) {
	return (0, import_with_selector.useSyncExternalStoreWithSelector)(store.subscribe, store.getSnapshot, store.getSnapshot, (state) => selector(state, a1, a2, a3));
}
/**
* A data store implementation that allows subscribing to state changes and updating the state.
* It uses an observer pattern to notify subscribers when the state changes.
*/
var Store = class {
	/**
	* Creates a store with the given initial state, constructing the class it is called on.
	* Calling it on a generic base class (e.g. `ReactStore.create(...)`) constructs that
	* class but degrades the inferred instance type to `Store`; use `new` there instead.
	*/
	static create(state) {
		return new this(state);
	}
	/**
	* The current state of the store.
	* This property is updated immediately when the state changes as a result of calling {@link setState}, {@link update}, or {@link set}.
	* To subscribe to state changes, use the {@link useState} method. The value returned by {@link useState} is updated after the component renders (similarly to React's useState).
	* The values can be used directly (to avoid subscribing to the store) in effects or event handlers.
	*
	* Do not modify properties in state directly. Instead, use the provided methods to ensure proper state management and listener notification.
	*/
	constructor(state) {
		this.state = state;
		this.listeners = /* @__PURE__ */ new Set();
		this.updateTick = 0;
	}
	/**
	* Registers a listener that will be called whenever the store's state changes.
	*
	* @param fn The listener function to be called on state changes.
	* @returns A function to unsubscribe the listener.
	*/
	subscribe = (fn) => {
		this.listeners.add(fn);
		return () => {
			this.listeners.delete(fn);
		};
	};
	/**
	* Returns the current state of the store.
	*/
	getSnapshot = () => {
		return this.state;
	};
	/**
	* Updates the entire store's state and notifies all registered listeners.
	*
	* @param newState The new state to set for the store.
	*/
	setState(newState) {
		if (this.state === newState) return;
		this.state = newState;
		this.updateTick += 1;
		const currentTick = this.updateTick;
		for (const listener of this.listeners) {
			if (currentTick !== this.updateTick) return;
			listener(newState);
		}
	}
	/**
	* Merges the provided changes into the current state and notifies listeners if there are changes.
	* Each value must match its state key. Pass an exact known subset rather than a broad
	* `Partial<State>`, which may contain `undefined` for required state fields.
	*
	* @param changes An object containing the changes to apply to the current state.
	*/
	update(changes) {
		for (const key in changes) if (!Object.is(this.state[key], changes[key])) {
			this.setState({
				...this.state,
				...changes
			});
			return;
		}
	}
	/**
	* Sets a specific key in the store's state to a new value and notifies listeners if the value has changed.
	*
	* @param key The key in the store's state to update.
	* @param value The new value to set for the specified key.
	*/
	set(key, value) {
		if (!Object.is(this.state[key], value)) this.setState({
			...this.state,
			[key]: value
		});
	}
	/**
	* Gives the state a new reference and updates all registered listeners.
	*/
	notifyAll() {
		const newState = { ...this.state };
		this.setState(newState);
	}
	use(selector, a1, a2, a3) {
		return useStore(this, selector, a1, a2, a3);
	}
};
/**
* A Store that supports controlled state keys, non-reactive values and provides utility methods for React.
*/
var ReactStore = class extends Store {
	/**
	* Creates a new ReactStore instance.
	*
	* @param state Initial state of the store.
	* @param context Non-reactive context values.
	* @param selectors Optional selectors for use with `useState`.
	*/
	constructor(state, context = {}, selectors) {
		super(state);
		this.context = context;
		this.selectors = selectors;
	}
	/**
	* Non-reactive values such as refs, callbacks, etc.
	*/
	/**
	* Synchronizes a single external value into the store.
	*
	* Note that the while the value in `state` is updated immediately, the value returned
	* by `useState` is updated before the next render (similarly to React's `useState`).
	*/
	useSyncedValue(key, value) {
		import_react.useDebugValue(key);
		const store = this;
		useIsoLayoutEffect(() => {
			if (store.state[key] !== value) store.set(key, value);
		}, [
			store,
			key,
			value
		]);
	}
	/**
	* Synchronizes a single external value into the store and
	* cleans it up (sets to `undefined`) on unmount.
	*
	* Note that the while the value in `state` is updated immediately, the value returned
	* by `useState` is updated before the next render (similarly to React's `useState`).
	*/
	useSyncedValueWithCleanup(key, value) {
		const store = this;
		useIsoLayoutEffect(() => {
			if (store.state[key] !== value) store.set(key, value);
			return () => {
				store.set(key, void 0);
			};
		}, [
			store,
			key,
			value
		]);
	}
	/**
	* Synchronizes multiple external values into the store.
	* Each value must match its state key. Pass an exact known subset rather than a broad
	* `Partial<State>`, which may contain `undefined` for required state fields.
	*
	* Note that the while the values in `state` are updated immediately, the values returned
	* by `useState` are updated before the next render (similarly to React's `useState`).
	*
	* @param statePart An exact subset of state fields to synchronize. Unknown keys are not accepted.
	*/
	useSyncedValues(statePart) {
		const store = this;
		{
			import_react.useDebugValue(statePart, (p) => Object.keys(p));
			const keys = import_react.useRef(Object.keys(statePart)).current;
			const nextKeys = Object.keys(statePart);
			if (keys.length !== nextKeys.length || keys.some((key, index) => key !== nextKeys[index])) console.error("ReactStore.useSyncedValues expects the same prop keys on every render. Keys should be stable.");
		}
		useIsoLayoutEffect(() => {
			store.update(statePart);
		}, [store, ...Object.values(statePart)]);
	}
	/**
	* Registers a controllable prop pair (`controlled`, `defaultValue`) for a specific key. If `controlled`
	* is non-undefined, the store's state at `key` is updated to match `controlled`.
	*/
	useControlledProp(key, controlled) {
		import_react.useDebugValue(key);
		const store = this;
		const isControlled = controlled !== void 0;
		useIsoLayoutEffect(() => {
			if (isControlled && !Object.is(store.state[key], controlled)) store.setState({
				...store.state,
				[key]: controlled
			});
		}, [
			store,
			key,
			controlled,
			isControlled
		]);
		{
			const cache = this.controlledValues ??= /* @__PURE__ */ new Map();
			if (!cache.has(key)) cache.set(key, isControlled);
			const previouslyControlled = cache.get(key);
			if (previouslyControlled !== void 0 && previouslyControlled !== isControlled) console.error(`A component is changing the ${previouslyControlled ? "" : "un"}controlled state of ${key.toString()} to be ${previouslyControlled ? "un" : ""}controlled. Elements should not switch from uncontrolled to controlled (or vice versa).`);
		}
	}
	/** Gets the current value from the store using a selector with the provided key.
	*
	* @param key Key of the selector to use.
	*/
	select(key, a1, a2, a3) {
		const selector = this.selectors[key];
		return selector(this.state, a1, a2, a3);
	}
	/**
	* Returns a value from the store's state using a selector function.
	* Used to subscribe to specific parts of the state.
	* This methods causes a rerender whenever the selected state changes.
	*
	* @param key Key of the selector to use.
	*/
	useState(key, a1, a2, a3) {
		import_react.useDebugValue(key);
		return useStore(this, this.selectors[key], a1, a2, a3);
	}
	/**
	* Wraps a function with `useStableCallback` to ensure it has a stable reference
	* and assigns it to the context.
	*
	* @param key Key of the event callback. Must be a function in the context.
	* @param fn Function to assign.
	*/
	useContextCallback(key, fn) {
		import_react.useDebugValue(key);
		const stableFunction = useStableCallback(fn ?? NOOP);
		this.context[key] = stableFunction;
	}
	/**
	* Returns a stable setter function for a specific key in the store's state.
	* It's commonly used to pass as a ref callback to React elements.
	*
	* @param key Key of the state to set.
	*/
	useStateSetter(key) {
		const ref = import_react.useRef(void 0);
		if (ref.current === void 0) ref.current = (value) => {
			this.set(key, value);
		};
		return ref.current;
	}
	/**
	* Observes changes derived from the store's selectors and calls the listener when the selected value changes.
	*
	* @param key Key of the selector to observe.
	* @param listener Listener function called when the selector result changes.
	*/
	observe(selector, listener) {
		let selectFn;
		if (typeof selector === "function") selectFn = selector;
		else selectFn = this.selectors[selector];
		let prevValue = selectFn(this.state);
		listener(prevValue, prevValue, this);
		return this.subscribe((nextState) => {
			const nextValue = selectFn(nextState);
			if (!Object.is(prevValue, nextValue)) {
				const oldValue = prevValue;
				prevValue = nextValue;
				listener(nextValue, oldValue, this);
			}
		});
	}
};
var selectors$1 = {
	open: (state) => state.open,
	transitionStatus: (state) => state.transitionStatus,
	domReferenceElement: (state) => state.domReferenceElement,
	referenceElement: (state) => state.positionReference ?? state.referenceElement,
	floatingElement: (state) => state.floatingElement,
	floatingId: (state) => state.floatingId
};
var FloatingRootStore = class extends ReactStore {
	constructor(options) {
		const { syncOnly, nested, onOpenChange, triggerElements, ...initialState } = options;
		super({
			...initialState,
			positionReference: initialState.referenceElement,
			domReferenceElement: initialState.referenceElement
		}, {
			onOpenChange,
			dataRef: { current: {} },
			events: createEventEmitter(),
			nested,
			triggerElements
		}, selectors$1);
		this.syncOnly = syncOnly;
	}
	/**
	* Syncs the event used by hover logic to distinguish hover-open from click-like interaction.
	*/
	syncOpenEvent = (newOpen, event) => {
		if (!newOpen || !this.state.open || event != null && isClickLikeEvent(event)) this.context.dataRef.current.openEvent = newOpen ? event : void 0;
	};
	/**
	* Runs the root-owned side effects for an open state change.
	*/
	dispatchOpenChange = (newOpen, eventDetails) => {
		this.syncOpenEvent(newOpen, eventDetails.event);
		const details = {
			open: newOpen,
			reason: eventDetails.reason,
			nativeEvent: eventDetails.event,
			nested: this.context.nested,
			triggerElement: eventDetails.trigger
		};
		this.context.events.emit("openchange", details);
	};
	/**
	* Emits the `openchange` event through the internal event emitter and calls the `onOpenChange` handler with the provided arguments.
	*
	* @param newOpen The new open state.
	* @param eventDetails Details about the event that triggered the open state change.
	*/
	setOpen = (newOpen, eventDetails) => {
		if (this.syncOnly) {
			this.context.onOpenChange?.(newOpen, eventDetails);
			return;
		}
		this.dispatchOpenChange(newOpen, eventDetails);
		this.context.onOpenChange?.(newOpen, eventDetails);
	};
};
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useOnMount-gxggz1m0n869s6r0.js
/**
* A React.useEffect equivalent that runs once, when the component is mounted.
*/
function useOnMount(fn) {
	import_react.useEffect(fn, EMPTY_ARRAY);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useTimeout-f0ayn2l2l9aop4l8.js
var EMPTY$1 = 0;
var Timeout = class Timeout {
	static create() {
		return new Timeout();
	}
	currentId = EMPTY$1;
	/**
	* Executes `fn` after `delay`, clearing any previously scheduled call.
	*/
	start(delay, fn) {
		this.clear();
		this.currentId = setTimeout(() => {
			this.currentId = EMPTY$1;
			fn();
		}, delay);
	}
	isStarted() {
		return this.currentId !== EMPTY$1;
	}
	clear = () => {
		if (this.currentId !== EMPTY$1) {
			clearTimeout(this.currentId);
			this.currentId = EMPTY$1;
		}
	};
	disposeEffect = () => {
		return this.clear;
	};
};
/**
* A `setTimeout` with automatic cleanup and guard.
*/
function useTimeout() {
	const timeout = useRefWithInit(Timeout.create).current;
	useOnMount(timeout.disposeEffect);
	return timeout;
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useValueAsRef-dv0tmfr1xlpzdlru.js
/**
* Untracks the provided value by turning it into a ref to remove its reactivity.
*
* Used to access the passed value inside `React.useEffect` without causing the effect to re-run when the value changes.
*/
function useValueAsRef(value) {
	const latest = useRefWithInit(createLatestRef, value).current;
	latest.next = value;
	useIsoLayoutEffect(latest.effect);
	return latest;
}
function createLatestRef(value) {
	const latest = {
		current: value,
		next: value,
		effect: () => {
			latest.current = latest.next;
		}
	};
	return latest;
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useAnimationFrame-k9lqdj9quln3sd85.js
/** Unlike `setTimeout`, rAF doesn't guarantee a positive integer return value, so we can't have
* a monomorphic `uint` type with `0` meaning empty.
* See warning note at:
* https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#return_value */
var EMPTY = null;
var LAST_RAF = globalThis.requestAnimationFrame;
var Scheduler = class {
	callbacks = [];
	callbacksCount = 0;
	nextId = 1;
	startId = 1;
	isScheduled = false;
	tick = (timestamp) => {
		this.isScheduled = false;
		const currentCallbacks = this.callbacks;
		const currentCallbacksCount = this.callbacksCount;
		this.callbacks = [];
		this.callbacksCount = 0;
		this.startId = this.nextId;
		if (currentCallbacksCount > 0) for (let i = 0; i < currentCallbacks.length; i += 1) currentCallbacks[i]?.(timestamp);
	};
	request(fn) {
		const id = this.nextId;
		this.nextId += 1;
		this.callbacks.push(fn);
		this.callbacksCount += 1;
		const didRAFChange = LAST_RAF !== requestAnimationFrame && (LAST_RAF = requestAnimationFrame, true);
		if (!this.isScheduled || didRAFChange) {
			requestAnimationFrame(this.tick);
			this.isScheduled = true;
		}
		return id;
	}
	cancel(id) {
		const index = id - this.startId;
		if (index < 0 || index >= this.callbacks.length) return;
		if (this.callbacks[index] === null) return;
		this.callbacks[index] = null;
		this.callbacksCount -= 1;
	}
};
var scheduler = new Scheduler();
var AnimationFrame = class AnimationFrame {
	static create() {
		return new AnimationFrame();
	}
	static request(fn) {
		return scheduler.request(fn);
	}
	static cancel(id) {
		return scheduler.cancel(id);
	}
	currentId = EMPTY;
	/**
	* Executes `fn` after `delay`, clearing any previously scheduled call.
	*/
	request(fn) {
		this.cancel();
		this.currentId = scheduler.request(() => {
			this.currentId = EMPTY;
			fn();
		});
	}
	cancel = () => {
		if (this.currentId !== EMPTY) {
			scheduler.cancel(this.currentId);
			this.currentId = EMPTY;
		}
	};
	disposeEffect = () => {
		return this.cancel;
	};
};
/**
* A `requestAnimationFrame` with automatic cleanup and guard.
*/
function useAnimationFrame() {
	const timeout = useRefWithInit(AnimationFrame.create).current;
	useOnMount(timeout.disposeEffect);
	return timeout;
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/getFiniteAnimations-jwd833ybtz81j5f0.js
/**
* Excludes infinite animations, whose finished promises never resolve while they run.
*/
function getFiniteAnimations(element, options) {
	return element.getAnimations(options).filter((animation) => {
		const timing = animation.effect?.getTiming();
		return timing?.duration !== Infinity && timing?.iterations !== Infinity;
	});
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useOpenChangeComplete-edtabjwqmechsyv6.js
/**
* If the provided argument is a ref object, returns its `current` value.
* Otherwise, returns the argument itself.
*/
function resolveRef(maybeRef) {
	if (maybeRef == null) return maybeRef;
	return "current" in maybeRef ? maybeRef.current : maybeRef;
}
var pendingCallbacks = null;
/**
* Runs the callback in a synchronous flush before the browser paints, so that the
* browser doesn't paint an intermediate frame: https://github.com/mui/base-ui/issues/979
* Callbacks that become ready within the same microtask checkpoint (e.g. multiple elements
* whose animations finish together) are batched into a single commit:
* https://github.com/mui/base-ui/issues/5481
*/
function flushBeforePaint(fn) {
	if (!pendingCallbacks) {
		const callbacks = [];
		pendingCallbacks = callbacks;
		queueMicrotask(() => {
			pendingCallbacks = null;
			import_react_dom.flushSync(() => {
				for (const callback of callbacks) callback();
			});
		});
	}
	pendingCallbacks.push(fn);
}
/**
* Executes a function once all animations have finished on the provided element.
* If an animation is canceled, waits for any replacement animations before executing.
* @param elementOrRef - The element to watch for animations.
* @param waitForStartingStyleRemoved - Whether to wait for [data-starting-style] to be removed before checking for animations.
* @param batch - Whether completions ready in the same microtask may be coalesced into a single
* commit. A batched callback runs before earlier callbacks' React updates have committed, so only
* opt in when the callback doesn't read state that another completion can change.
* @returns A function that takes a callback to execute once all animations have finished, and an optional AbortSignal to abort the callback
*/
function useAnimationsFinished(elementOrRef, waitForStartingStyleRemoved = false, batch = false) {
	const frame = useAnimationFrame();
	return useStableCallback((fnToExecute, signal = null) => {
		frame.cancel();
		const element = resolveRef(elementOrRef);
		if (element == null) return;
		const resolvedElement = element;
		const done = () => {
			if (!batch) {
				import_react_dom.flushSync(fnToExecute);
				return;
			}
			flushBeforePaint(() => {
				if (!signal?.aborted) fnToExecute();
			});
		};
		if (typeof resolvedElement.getAnimations !== "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
			fnToExecute();
			return;
		}
		function exec() {
			Promise.all(getFiniteAnimations(resolvedElement).map((animation) => animation.finished.then(NOOP))).then(() => {
				if (!signal?.aborted) done();
			}, () => {
				if (signal?.aborted) return;
				if (getFiniteAnimations(resolvedElement).some((animation) => animation.pending || animation.playState !== "finished")) {
					exec();
					return;
				}
				done();
			});
		}
		if (waitForStartingStyleRemoved) {
			const startingStyleAttribute = startingStyle$1;
			if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
				frame.request(exec);
				return;
			}
			const attributeObserver = new MutationObserver(() => {
				if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
					attributeObserver.disconnect();
					exec();
				}
			});
			attributeObserver.observe(resolvedElement, {
				attributes: true,
				attributeFilter: [startingStyleAttribute]
			});
			signal?.addEventListener("abort", () => attributeObserver.disconnect(), { once: true });
			return;
		}
		frame.request(exec);
	});
}
/**
* Calls the provided function when the CSS open/close animation or transition completes.
*/
function useOpenChangeComplete(parameters) {
	const { enabled = true, open, ref, batch = false, onComplete: onCompleteParam } = parameters;
	const onComplete = useStableCallback(onCompleteParam);
	const runOnceAnimationsFinish = useAnimationsFinished(ref, open, batch);
	import_react.useEffect(() => {
		if (!enabled) return;
		const abortController = new AbortController();
		runOnceAnimationsFinish(onComplete, abortController.signal);
		return () => {
			abortController.abort();
		};
	}, [
		enabled,
		open,
		onComplete,
		runOnceAnimationsFinish
	]);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useTransitionStatus-disysoblzgk34w14.js
/**
* Provides a status string for CSS animations.
* @param open - a boolean that determines if the element is open.
* @param enableIdleState - a boolean that enables the `'idle'` state between `'starting'` and `'ending'`
* @param deferEndingState - a boolean that delays the `'ending'` state by a frame
* @param animateInitialOpen - a boolean that makes an element which mounts already open still go
*   through `'starting'`. Off by default so content that was open on the first render (a
*   `defaultOpen` popup on page load, SSR'd markup) doesn't animate in.
*/
function useTransitionStatus(open, enableIdleState = false, deferEndingState = false, animateInitialOpen = false) {
	const [transitionStatus, setTransitionStatus] = import_react.useState(open && enableIdleState ? "idle" : void 0);
	const [mounted, setMounted] = import_react.useState(open && !animateInitialOpen);
	if (open && !mounted) {
		setMounted(true);
		setTransitionStatus("starting");
	}
	if (!open && mounted && transitionStatus !== "ending" && !deferEndingState) setTransitionStatus("ending");
	if (!open && !mounted && transitionStatus === "ending") setTransitionStatus(void 0);
	useIsoLayoutEffect(() => {
		if (!open && mounted && transitionStatus !== "ending" && deferEndingState) {
			const frame = AnimationFrame.request(() => {
				setTransitionStatus("ending");
			});
			return () => {
				AnimationFrame.cancel(frame);
			};
		}
	}, [
		open,
		mounted,
		transitionStatus,
		deferEndingState
	]);
	useIsoLayoutEffect(() => {
		if (!open || enableIdleState || transitionStatus === void 0) return;
		const frame = AnimationFrame.request(() => {
			setTransitionStatus(void 0);
		});
		return () => {
			AnimationFrame.cancel(frame);
		};
	}, [
		enableIdleState,
		open,
		transitionStatus
	]);
	useIsoLayoutEffect(() => {
		if (!open || !enableIdleState) return;
		if (open && mounted && transitionStatus !== "idle") setTransitionStatus("starting");
		const frame = AnimationFrame.request(() => {
			setTransitionStatus("idle");
		});
		return () => {
			AnimationFrame.cancel(frame);
		};
	}, [
		enableIdleState,
		open,
		mounted,
		transitionStatus
	]);
	return {
		mounted,
		setMounted,
		transitionStatus
	};
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/popupStoreUtils-czfnxn051xakask5.js
function getNodeChildren(nodes, id, onlyOpenChildren = true) {
	return nodes.filter((node) => node.parentId === id).flatMap((child) => [...!onlyOpenChildren || child.context?.open ? [child] : [], ...getNodeChildren(nodes, child.id, onlyOpenChildren)]);
}
function getNodeAncestors(nodes, id) {
	let allAncestors = [];
	let currentParentId = nodes.find((node) => node.id === id)?.parentId;
	while (currentParentId) {
		const currentNode = nodes.find((node) => node.id === currentParentId);
		currentParentId = currentNode?.parentId;
		if (currentNode) allAncestors = allAncestors.concat(currentNode);
	}
	return allAncestors;
}
function alwaysFalse() {
	return false;
}
function normalizeProp(normalizable) {
	return {
		escapeKey: typeof normalizable === "boolean" ? normalizable : normalizable?.escapeKey ?? false,
		outsidePress: typeof normalizable === "boolean" ? normalizable : normalizable?.outsidePress ?? true
	};
}
/**
* Closes the floating element when a dismissal is requested — by default, when
* the user presses the `escape` key or outside of the floating element.
* @see https://floating-ui.com/docs/useDismiss
*/
function useDismiss(store, props = {}) {
	const { enabled = true, escapeKey: escapeKey$1 = true, outsidePress: outsidePressProp = true, outsidePressEvent = "sloppy", referencePress = alwaysFalse, bubbles, externalTree } = props;
	const open = store.useState("open");
	const floatingElement = store.useState("floatingElement");
	const { dataRef, events } = store.context;
	const tree = useFloatingTree(externalTree);
	const outsidePressFn = useStableCallback(typeof outsidePressProp === "function" ? outsidePressProp : () => false);
	const outsidePress$1 = typeof outsidePressProp === "function" ? outsidePressFn : outsidePressProp;
	const outsidePressEnabled = outsidePress$1 !== false;
	const getOutsidePressEventProp = useStableCallback(() => outsidePressEvent);
	const { escapeKey: escapeKeyBubbles, outsidePress: outsidePressBubbles } = normalizeProp(bubbles);
	const pressStartedInsideRef = import_react.useRef(false);
	const pressStartPreventedRef = import_react.useRef(false);
	const suppressNextOutsideClickRef = import_react.useRef(false);
	const sawPressWhileOpenRef = import_react.useRef(false);
	const isComposingRef = import_react.useRef(false);
	const currentPointerTypeRef = import_react.useRef("");
	const touchStateRef = import_react.useRef(null);
	const cancelDismissOnEndTimeout = useTimeout();
	const clearInsideReactTreeTimeout = useTimeout();
	const compositionTimeout = useTimeout();
	const clearInsideReactTree = useStableCallback(() => {
		clearInsideReactTreeTimeout.clear();
		dataRef.current.insideReactTree = false;
	});
	const hasBlockingChild = useStableCallback((bubbleKey) => {
		const nodeId = dataRef.current.floatingContext?.nodeId;
		return (tree ? getNodeChildren(tree.nodesRef.current, nodeId) : []).some((child) => child.context?.open && !child.context.dataRef.current[bubbleKey]);
	});
	const isEventWithinOwnElements = useStableCallback((event) => {
		return isEventTargetWithin(event, store.select("floatingElement")) || isEventTargetWithin(event, store.select("domReferenceElement"));
	});
	const closeOnReferencePress = useStableCallback((event) => {
		if (!referencePress()) return;
		store.setOpen(false, createChangeEventDetails(triggerPress, event.nativeEvent));
	});
	const closeOnEscapeKeyDown = useStableCallback((event) => {
		if (!open || !enabled || !escapeKey$1 || event.key !== "Escape") return;
		const native = isReactEvent(event) ? event.nativeEvent : event;
		if (isComposingRef.current || native.isComposing) return;
		if (!escapeKeyBubbles && hasBlockingChild("__escapeKeyBubbles")) return;
		const eventDetails = createChangeEventDetails(escapeKey, native);
		store.setOpen(false, eventDetails);
		if (!eventDetails.isCanceled) event.preventDefault();
		if (!escapeKeyBubbles && !eventDetails.isPropagationAllowed) event.stopPropagation();
	});
	const markInsideReactTree = useStableCallback(() => {
		dataRef.current.insideReactTree = true;
		clearInsideReactTreeTimeout.start(0, clearInsideReactTree);
	});
	const markPressStartedInsideReactTree = useStableCallback((event) => {
		if (!open || !enabled || event.button !== 0) return;
		const target = getTarget(event.nativeEvent);
		if (!contains(store.select("floatingElement"), target)) return;
		if (!pressStartedInsideRef.current) {
			pressStartedInsideRef.current = true;
			pressStartPreventedRef.current = false;
		}
	});
	const markInsidePressStartPrevented = useStableCallback((event) => {
		if (!open || !enabled) return;
		if (!(event.defaultPrevented || event.nativeEvent.defaultPrevented)) return;
		if (pressStartedInsideRef.current) pressStartPreventedRef.current = true;
	});
	import_react.useEffect(() => {
		function handleOpenChange(details) {
			if (!details.open) sawPressWhileOpenRef.current = false;
		}
		events.on("openchange", handleOpenChange);
		return () => {
			events.off("openchange", handleOpenChange);
		};
	}, [events]);
	import_react.useEffect(() => clearInsideReactTree, [clearInsideReactTree]);
	import_react.useEffect(() => {
		if (!open || !enabled) {
			if (!open) {
				sawPressWhileOpenRef.current = false;
				isComposingRef.current = false;
				currentPointerTypeRef.current = "";
				touchStateRef.current = null;
			}
			return clearInsideReactTree;
		}
		dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
		dataRef.current.__outsidePressBubbles = outsidePressBubbles;
		const preventedPressSuppressionTimeout = new Timeout();
		const doc = ownerDocument(floatingElement);
		function handleCompositionStart() {
			compositionTimeout.clear();
			isComposingRef.current = true;
		}
		function handleCompositionEnd() {
			isComposingRef.current = true;
			compositionTimeout.start(webkit ? 5 : 0, () => {
				isComposingRef.current = false;
			});
		}
		function suppressImmediateOutsideClickAfterPreventedStart() {
			suppressNextOutsideClickRef.current = true;
			preventedPressSuppressionTimeout.start(0, () => {
				suppressNextOutsideClickRef.current = false;
			});
		}
		function resetPressStartState() {
			pressStartedInsideRef.current = false;
			pressStartPreventedRef.current = false;
		}
		function getOutsidePressEvent() {
			const type = currentPointerTypeRef.current;
			const computedType = type === "pen" || !type ? "mouse" : type;
			const outsidePressEventValue = getOutsidePressEventProp();
			const resolved = typeof outsidePressEventValue === "function" ? outsidePressEventValue() : outsidePressEventValue;
			if (typeof resolved === "string") return resolved;
			return resolved[computedType];
		}
		function shouldIgnoreEvent(event) {
			const computedOutsidePressEvent = getOutsidePressEvent();
			return computedOutsidePressEvent === "intentional" && event.type !== "click" || computedOutsidePressEvent === "sloppy" && event.type === "click";
		}
		function isEventWithinFloatingTree(event) {
			const nodeId = dataRef.current.floatingContext?.nodeId;
			const targetIsInsideChildren = tree && getNodeChildren(tree.nodesRef.current, nodeId).some((node) => isEventTargetWithin(event, node.context?.elements.floating));
			return isEventWithinOwnElements(event) || targetIsInsideChildren;
		}
		function closeOnPressOutside(event) {
			if (shouldIgnoreEvent(event)) {
				if (event.type !== "click" && !isEventWithinOwnElements(event)) {
					preventedPressSuppressionTimeout.clear();
					suppressNextOutsideClickRef.current = false;
				}
				clearInsideReactTree();
				return;
			}
			if (dataRef.current.insideReactTree) {
				clearInsideReactTree();
				return;
			}
			const target = getTarget(event);
			const inertSelector = `[${createAttribute("inert")}]`;
			const targetRoot = isElement(target) ? target.getRootNode() : null;
			const markers = Array.from((isShadowRoot(targetRoot) ? targetRoot : ownerDocument(store.select("floatingElement"))).querySelectorAll(inertSelector));
			const triggers = store.context.triggerElements;
			if (target && (triggers.hasElement(target) || triggers.hasMatchingElement((trigger) => contains(trigger, target)))) return;
			let targetRootAncestor = isElement(target) ? target : null;
			while (targetRootAncestor && !isLastTraversableNode(targetRootAncestor)) {
				const nextParent = getParentNode(targetRootAncestor);
				if (isLastTraversableNode(nextParent) || !isElement(nextParent)) break;
				targetRootAncestor = nextParent;
			}
			if (markers.length && isElement(target) && !isRootElement(target) && !contains(target, store.select("floatingElement")) && markers.every((marker) => !contains(targetRootAncestor, marker))) return;
			if (isHTMLElement(target) && !("touches" in event)) {
				const lastTraversableNode = isLastTraversableNode(target);
				const style = getComputedStyle$1(target);
				const scrollRe = /auto|scroll/;
				const isScrollableX = lastTraversableNode || scrollRe.test(style.overflowX);
				const isScrollableY = lastTraversableNode || scrollRe.test(style.overflowY);
				const canScrollX = isScrollableX && target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
				const canScrollY = isScrollableY && target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
				const isRTL = style.direction === "rtl";
				const pressedVerticalScrollbar = canScrollY && (isRTL ? event.offsetX <= target.offsetWidth - target.clientWidth : event.offsetX > target.clientWidth);
				const pressedHorizontalScrollbar = canScrollX && event.offsetY > target.clientHeight;
				if (pressedVerticalScrollbar || pressedHorizontalScrollbar) return;
			}
			if (isEventWithinFloatingTree(event)) return;
			if (getOutsidePressEvent() === "intentional") {
				if (event.detail !== 0 && !isVirtualClick(event) && !sawPressWhileOpenRef.current) return;
				if (suppressNextOutsideClickRef.current) {
					preventedPressSuppressionTimeout.clear();
					suppressNextOutsideClickRef.current = false;
					return;
				}
			}
			if (typeof outsidePress$1 === "function" && !outsidePress$1(event)) return;
			if (hasBlockingChild("__outsidePressBubbles")) return;
			store.setOpen(false, createChangeEventDetails(outsidePress, event));
			clearInsideReactTree();
		}
		function handlePointerDown(event) {
			if (getOutsidePressEvent() !== "sloppy" || event.pointerType === "touch" || !store.select("open") || !enabled || isEventWithinOwnElements(event)) return;
			closeOnPressOutside(event);
		}
		function handleTouchStart(event) {
			if (getOutsidePressEvent() !== "sloppy" || !store.select("open") || !enabled || isEventWithinOwnElements(event)) return;
			const touch = event.touches[0];
			if (touch) {
				touchStateRef.current = {
					startTime: Date.now(),
					startX: touch.clientX,
					startY: touch.clientY,
					dismissOnTouchEnd: false,
					dismissOnMouseDown: true
				};
				cancelDismissOnEndTimeout.start(1e3, () => {
					if (touchStateRef.current) {
						touchStateRef.current.dismissOnTouchEnd = false;
						touchStateRef.current.dismissOnMouseDown = false;
					}
				});
			}
		}
		function addTargetEventListenerOnce(event, listener) {
			const target = getTarget(event);
			if (!target) return;
			const unsubscribe = addEventListener(target, event.type, () => {
				listener(event);
				unsubscribe();
			});
		}
		function handleTouchStartCapture(event) {
			currentPointerTypeRef.current = "touch";
			addTargetEventListenerOnce(event, handleTouchStart);
		}
		function closeOnPressOutsideCapture(event) {
			cancelDismissOnEndTimeout.clear();
			if (event.type === "pointerdown") {
				if (event.button === 0) sawPressWhileOpenRef.current = true;
				currentPointerTypeRef.current = event.pointerType;
			}
			if (event.type === "mousedown" && touchStateRef.current && !touchStateRef.current.dismissOnMouseDown) return;
			addTargetEventListenerOnce(event, (targetEvent) => {
				if (targetEvent.type === "pointerdown") handlePointerDown(targetEvent);
				else closeOnPressOutside(targetEvent);
			});
		}
		function handlePressEndCapture(event) {
			if (event.type === "pointercancel") sawPressWhileOpenRef.current = false;
			if (!pressStartedInsideRef.current) return;
			const pressStartedInsideDefaultPrevented = pressStartPreventedRef.current;
			resetPressStartState();
			if (getOutsidePressEvent() !== "intentional") return;
			if (event.type === "pointercancel") {
				if (pressStartedInsideDefaultPrevented) suppressImmediateOutsideClickAfterPreventedStart();
				return;
			}
			if (isEventWithinFloatingTree(event)) return;
			if (pressStartedInsideDefaultPrevented) {
				suppressImmediateOutsideClickAfterPreventedStart();
				return;
			}
			if (typeof outsidePress$1 === "function" && !outsidePress$1(event)) return;
			preventedPressSuppressionTimeout.clear();
			suppressNextOutsideClickRef.current = true;
			clearInsideReactTree();
		}
		function handleTouchMove(event) {
			if (getOutsidePressEvent() !== "sloppy" || !touchStateRef.current || isEventWithinOwnElements(event)) return;
			const touch = event.touches[0];
			if (!touch) return;
			const deltaX = Math.abs(touch.clientX - touchStateRef.current.startX);
			const deltaY = Math.abs(touch.clientY - touchStateRef.current.startY);
			const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
			if (distance > 5) touchStateRef.current.dismissOnTouchEnd = true;
			if (distance > 10) {
				closeOnPressOutside(event);
				cancelDismissOnEndTimeout.clear();
				touchStateRef.current = null;
			}
		}
		function handleTouchMoveCapture(event) {
			addTargetEventListenerOnce(event, handleTouchMove);
		}
		function handleTouchEnd(event) {
			if (getOutsidePressEvent() !== "sloppy" || !touchStateRef.current || isEventWithinOwnElements(event)) return;
			if (touchStateRef.current.dismissOnTouchEnd) closeOnPressOutside(event);
			cancelDismissOnEndTimeout.clear();
			touchStateRef.current = null;
		}
		function handleTouchEndCapture(event) {
			addTargetEventListenerOnce(event, handleTouchEnd);
		}
		const unsubscribe = mergeCleanups(escapeKey$1 && mergeCleanups(addEventListener(doc, "keydown", closeOnEscapeKeyDown), addEventListener(doc, "compositionstart", handleCompositionStart), addEventListener(doc, "compositionend", handleCompositionEnd)), outsidePressEnabled && mergeCleanups(addEventListener(doc, "click", closeOnPressOutsideCapture, true), addEventListener(doc, "pointerdown", closeOnPressOutsideCapture, true), addEventListener(doc, "pointerup", handlePressEndCapture, true), addEventListener(doc, "pointercancel", handlePressEndCapture, true), addEventListener(doc, "mousedown", closeOnPressOutsideCapture, true), addEventListener(doc, "mouseup", handlePressEndCapture, true), addEventListener(doc, "touchstart", handleTouchStartCapture, {
			capture: true,
			passive: true
		}), addEventListener(doc, "touchmove", handleTouchMoveCapture, {
			capture: true,
			passive: true
		}), addEventListener(doc, "touchend", handleTouchEndCapture, {
			capture: true,
			passive: true
		})));
		return () => {
			unsubscribe();
			preventedPressSuppressionTimeout.clear();
			resetPressStartState();
			suppressNextOutsideClickRef.current = false;
		};
	}, [
		dataRef,
		floatingElement,
		escapeKey$1,
		outsidePressEnabled,
		outsidePress$1,
		open,
		enabled,
		escapeKeyBubbles,
		outsidePressBubbles,
		closeOnEscapeKeyDown,
		clearInsideReactTree,
		getOutsidePressEventProp,
		hasBlockingChild,
		isEventWithinOwnElements,
		tree,
		store,
		cancelDismissOnEndTimeout,
		compositionTimeout
	]);
	const reference = import_react.useMemo(() => ({
		onKeyDown: closeOnEscapeKeyDown,
		onPointerDown: closeOnReferencePress,
		onClick: closeOnReferencePress
	}), [closeOnEscapeKeyDown, closeOnReferencePress]);
	const floating = import_react.useMemo(() => ({
		onKeyDown: closeOnEscapeKeyDown,
		onPointerDown: markInsidePressStartPrevented,
		onMouseDown: markInsidePressStartPrevented,
		onClickCapture: markInsideReactTree,
		onMouseDownCapture(event) {
			markInsideReactTree();
			markPressStartedInsideReactTree(event);
		},
		onPointerDownCapture(event) {
			markInsideReactTree();
			markPressStartedInsideReactTree(event);
		},
		onMouseUpCapture: markInsideReactTree,
		onTouchEndCapture: markInsideReactTree,
		onTouchMoveCapture: markInsideReactTree
	}), [
		closeOnEscapeKeyDown,
		markInsideReactTree,
		markPressStartedInsideReactTree,
		markInsidePressStartPrevented
	]);
	return import_react.useMemo(() => enabled ? {
		reference,
		floating,
		trigger: reference
	} : {}, [
		enabled,
		reference,
		floating
	]);
}
/**
* Narrowed to the store members this hook uses so consumers do not need to provide
* unrelated store capabilities.
*/
/**
* Keeps the provided FloatingRootStore in sync with the provided PopupStore.
*/
function useSyncedFloatingRootContext(options) {
	const { popupStore, treatPopupAsFloatingElement = false, floatingRootContext: store, floatingId, nested, onOpenChange } = options;
	const open = popupStore.useState("open");
	const referenceElement = popupStore.useState("activeTriggerElement");
	const floatingElement = popupStore.useState(treatPopupAsFloatingElement ? "popupElement" : "positionerElement");
	const handleOpenChange = onOpenChange;
	popupStore.useSyncedValue("floatingId", floatingId);
	useIsoLayoutEffect(() => {
		const valuesToSync = {
			open,
			floatingId,
			referenceElement,
			floatingElement
		};
		if (isElement(referenceElement)) valuesToSync.domReferenceElement = referenceElement;
		if (store.state.positionReference === store.state.referenceElement) valuesToSync.positionReference = referenceElement;
		store.update(valuesToSync);
	}, [
		open,
		floatingId,
		referenceElement,
		floatingElement,
		store
	]);
	store.context.onOpenChange = handleOpenChange;
	store.context.nested = nested;
	return store;
}
/**
* Keeps a popup mounted through its closing animation and unmounts it once the animation
* finishes, unless the close cycle opted out through `preventUnmountOnClose`.
* Store-agnostic: hosts sync `mounted` and `transitionStatus` wherever they need them.
*
* @returns `forceUnmount` unmounts the popup immediately. It is a no-op once the popup is already
*   unmounted, so calling it after the automatic unmount doesn't repeat the completion callback,
*   and a call while the popup is open only takes effect if a close commits in the same batch.
*/
function useUnmountAfterClose(parameters) {
	const { open, ref, preventUnmountOnClose, setPreventUnmountOnClose: setPreventUnmountOnCloseParam, onUnmount, animateInitialOpen } = parameters;
	const setPreventUnmountOnClose = useStableCallback(setPreventUnmountOnCloseParam);
	const { mounted, setMounted, transitionStatus } = useTransitionStatus(open, false, false, animateInitialOpen);
	const preventUnmountingOnClose = open ? false : preventUnmountOnClose;
	useIsoLayoutEffect(() => {
		if (open) setPreventUnmountOnClose(false);
	}, [open, setPreventUnmountOnClose]);
	const mountedRef = import_react.useRef(mounted);
	const pendingUnmountRef = import_react.useRef(false);
	const rerender = useForcedRerendering();
	const unmount = () => {
		mountedRef.current = false;
		setMounted(false);
		onUnmount();
	};
	useIsoLayoutEffect(() => {
		mountedRef.current = mounted;
		if (pendingUnmountRef.current) {
			pendingUnmountRef.current = false;
			if (!open && mounted) unmount();
		}
	});
	const forceUnmount = useStableCallback(() => {
		if (!mountedRef.current) return;
		if (open) {
			pendingUnmountRef.current = true;
			rerender();
			return;
		}
		unmount();
	});
	useOpenChangeComplete({
		enabled: mounted && !open && !preventUnmountingOnClose,
		open,
		ref,
		onComplete() {
			if (!open) forceUnmount();
		}
	});
	return {
		mounted,
		transitionStatus,
		preventUnmountingOnClose,
		forceUnmount
	};
}
var FOCUSABLE_POPUP_PROPS = {
	tabIndex: -1,
	[FOCUSABLE_ATTRIBUTE]: ""
};
/**
* Returns the default `initialFocus` resolver for a popup. When opened by touch it focuses the
* popup element itself to prevent the virtual keyboard from opening (required for Android
* specifically; iOS handles this automatically). Otherwise it falls back to the default behavior.
*/
function createDefaultInitialFocus(popupRef) {
	return (interactionType) => interactionType === "touch" ? popupRef.current : true;
}
/**
* The subset of a popup handle that a Root needs to bind its store to. Both the real handle classes
* and any test double satisfy it.
*/
/**
* Creates and owns a popup store on behalf of a Root part. The store is created exactly once, with
* controlled props and root state synced separately after creation. Sets up the synced floating
* root context and returns the store.
*
* @param createStore Factory that builds the store. Called exactly once, receiving the floating id
* and whether the popup is nested inside another floating element, both resolved on the first render.
* @param treatPopupAsFloatingElement Whether the popup element is passed to Floating UI as the
* floating element instead of the default positioner.
*/
function usePopupRootStore(createStore, treatPopupAsFloatingElement = false) {
	const floatingId = useId$1();
	const nested = useFloatingParentNodeId() != null;
	const store = useRefWithInit(() => createStore(floatingId, nested)).current;
	useSyncedFloatingRootContext({
		popupStore: store,
		treatPopupAsFloatingElement,
		floatingRootContext: store.state.floatingRootContext,
		floatingId,
		nested,
		onOpenChange: store.setOpen
	});
	return store;
}
/**
* Attaches a Root's store to a handle for this component's committed lifetime. Popup Roots render
* it before their interactions and user children so its layout effect runs before descendant layout
* effects. This lets descendants call the handle during the Root's initial commit without attaching
* during render, which would leak suspended or abandoned stores. Store subscribers are notified by
* `attachStore` in this ordinary layout phase, where React permits synchronous updates.
*
* Popup Roots must render this component only when a handle is present so handle-less Roots avoid
* mounting an extra fiber and layout effect.
*/
function PopupHandleAttachment({ handle, store }) {
	useIsoLayoutEffect(() => {
		return handle.attachStore(store);
	}, [handle, store]);
	return null;
}
function syncTriggerCount(store) {
	const triggerCount = store.context.triggerElements.size;
	if (store.select("open") && store.state.triggerCount !== triggerCount) store.set("triggerCount", triggerCount);
}
/**
* Returns a stable callback ref that registers/unregisters the trigger element in the store.
*
* Stable so a downstream ref merger that retains the callback it was first given still reaches the
* trigger's current store. The registration is tracked as a `(store, id, element)` triple, so
* unregistering targets the store the element was actually registered in.
*
* Since the callback never changes, the caller must re-run it from a layout effect keyed on
* `[store, id]` to migrate an already-registered element. That effect is also what registers the
* element in the first place when `id` only resolves after the first commit (React 17's `useId`
* fallback), because the register call made while the id is still `undefined` does nothing.
*
* @param id Id of the trigger.
* @param store The Store instance where the trigger should be registered.
*/
function useTriggerRegistration(id, store) {
	const registrationRef = import_react.useRef(null);
	return useStableCallback((element) => {
		const registration = registrationRef.current;
		if (registration !== null) {
			if (registration.element === element && registration.store === store && registration.id === id) return;
			registrationRef.current = null;
			const registeredStore = registration.store;
			if (registeredStore.context.triggerElements.getById(registration.id) === registration.element) {
				registeredStore.context.triggerElements.delete(registration.id);
				syncTriggerCount(registeredStore);
			}
		}
		if (element !== null && id !== void 0) {
			registrationRef.current = {
				store,
				id,
				element
			};
			store.context.triggerElements.add(id, element);
			syncTriggerCount(store);
		}
	});
}
function createPopupOpenState(state, open, trigger, preventUnmountOnClose = false) {
	let preventUnmountingOnClose = state.preventUnmountingOnClose;
	if (open) preventUnmountingOnClose = false;
	else if (preventUnmountOnClose) preventUnmountingOnClose = true;
	const triggerId = trigger?.id ?? null;
	let activeTriggerId = state.activeTriggerId;
	let activeTriggerElement = state.activeTriggerElement;
	if (triggerId || open) {
		activeTriggerId = triggerId;
		activeTriggerElement = trigger ?? null;
	}
	return {
		open,
		preventUnmountingOnClose,
		activeTriggerId,
		activeTriggerElement,
		openedWithoutTrigger: open ? trigger == null : state.openedWithoutTrigger
	};
}
function attachPreventUnmountOnClose(eventDetails) {
	let preventUnmountOnClose = false;
	eventDetails.preventUnmountOnClose = () => {
		preventUnmountOnClose = true;
	};
	return () => preventUnmountOnClose;
}
/**
* Runs the shared open-change sequence for a popup store: notifies `onOpenChange`,
* honors cancellation, dispatches the floating root change, maps the reason to an
* `instantType`, and commits the state update (synchronously for hover so
* `getAnimations()` observes it). Stores supply their own differences via
* `extraState` (e.g. the last change reason) and `onBeforeDispatch` (e.g. updating
* inline-rect coordinates).
*/
function applyPopupOpenChange(store, nextOpen, eventDetails, options = {}) {
	const reason = eventDetails.reason;
	const isHover = reason === triggerHover;
	const isFocusOpen = nextOpen && reason === "trigger-focus";
	const isDismissClose = !nextOpen && (reason === "trigger-press" || reason === "escape-key");
	const shouldPreventUnmountOnClose = attachPreventUnmountOnClose(eventDetails);
	store.context.onOpenChange?.(nextOpen, eventDetails);
	if (eventDetails.isCanceled) return;
	options.onBeforeDispatch?.();
	store.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
	const changeState = () => {
		const popupOpenState = createPopupOpenState(store.state, nextOpen, eventDetails.trigger, shouldPreventUnmountOnClose());
		const updatedState = {
			...options.extraState,
			...popupOpenState
		};
		if (isFocusOpen) updatedState.instantType = "focus";
		else if (isDismissClose) updatedState.instantType = "dismiss";
		else if (isHover) updatedState.instantType = void 0;
		store.update(updatedState);
	};
	if (isHover) import_react_dom.flushSync(changeState);
	else changeState();
}
/**
* Sets up trigger data forwarding to the store.
*
* @param triggerId Id of the trigger.
* @param triggerElementRef Ref for the trigger DOM element.
* @param store The Store instance managing the popup state.
* @param stateUpdates An object with state updates to apply when the trigger is active.
*/
function useTriggerDataForwarding(triggerId, triggerElementRef, store, stateUpdates) {
	const isMountedByThisTrigger = store.useState("isMountedByTrigger", triggerId);
	const baseRegisterTrigger = useTriggerRegistration(triggerId, store);
	const applyTriggerData = useStableCallback((element) => {
		const open = store.select("open");
		const activeTriggerId = store.select("activeTriggerId");
		if (activeTriggerId === triggerId) {
			const changes = {
				activeTriggerElement: element,
				...open ? stateUpdates : null
			};
			store.update(changes);
			return;
		}
		if (activeTriggerId == null && open && !store.state.openedWithoutTrigger) {
			const changes = {
				activeTriggerId: triggerId ?? null,
				activeTriggerElement: element,
				...stateUpdates
			};
			store.update(changes);
		}
	});
	const registerTrigger = useStableCallback((element) => {
		baseRegisterTrigger(element);
		if (element) applyTriggerData(element);
	});
	useIsoLayoutEffect(() => {
		registerTrigger(triggerElementRef.current);
		return () => registerTrigger(null);
	}, [
		registerTrigger,
		triggerElementRef,
		store,
		triggerId
	]);
	useIsoLayoutEffect(() => {
		if (isMountedByThisTrigger) {
			const changes = {
				activeTriggerElement: triggerElementRef.current,
				...stateUpdates
			};
			store.update(changes);
		}
	}, [
		isMountedByThisTrigger,
		store,
		triggerElementRef,
		...Object.values(stateUpdates)
	]);
	return {
		registerTrigger,
		isMountedByThisTrigger
	};
}
/**
* Keeps trigger registration state synchronized while the popup is open.
*
* When a popup opens without an explicit trigger id and exactly one trigger is registered, that
* trigger is claimed as the active trigger, unless the open request deliberately carried no trigger
* (`openedWithoutTrigger`). When the active trigger id is still registered but its
* element changed, the active element is refreshed. When the active trigger id is missing from the
* registry but the same element is still registered under a different id (e.g. the rendered trigger
* carries its own DOM `id` that differs from Base UI's internal trigger id), the active id is
* reassociated to the registered id instead of being treated as lost. When the active trigger
* unregisters, the default path preserves existing ownership so non-closing popup families do not
* silently claim a different trigger while staying open.
*
* If `closeOnActiveTriggerUnmount` is enabled, unregistering a previously resolved active trigger
* requests a close after a microtask so a same-tick replacement trigger with the same id can
* register first. An active trigger id that has not matched a registered trigger yet is treated as
* pending and does not request a close.
*
* This should be called on the Root part.
*
* @param store The Store instance managing the popup state.
* @param options Options for active trigger unmount behavior.
*/
function useImplicitActiveTrigger(store, options = {}) {
	const { closeOnActiveTriggerUnmount = false } = options;
	const resolvedActiveTriggerIdRef = import_react.useRef(null);
	const open = store.useState("open");
	useIsoLayoutEffect(() => {
		if (!open) {
			resolvedActiveTriggerIdRef.current = null;
			if (store.state.triggerCount !== 0) store.set("triggerCount", 0);
			if (store.state.openedWithoutTrigger) store.set("openedWithoutTrigger", false);
			return;
		}
		const triggerCount = store.context.triggerElements.size;
		const stateUpdates = {};
		if (store.state.triggerCount !== triggerCount) stateUpdates.triggerCount = triggerCount;
		const currentActiveTriggerId = store.select("activeTriggerId");
		let lostActiveTriggerId = null;
		if (currentActiveTriggerId) {
			const activeTriggerElement = store.context.triggerElements.getById(currentActiveTriggerId);
			if (!activeTriggerElement) {
				for (const [triggerId, triggerElement] of store.context.triggerElements.entries()) if (triggerElement === store.state.activeTriggerElement) {
					stateUpdates.activeTriggerId = triggerId;
					stateUpdates.activeTriggerElement = triggerElement;
					resolvedActiveTriggerIdRef.current = triggerId;
					break;
				}
				if (stateUpdates.activeTriggerId === void 0) if (resolvedActiveTriggerIdRef.current === currentActiveTriggerId) lostActiveTriggerId = currentActiveTriggerId;
				else resolvedActiveTriggerIdRef.current = null;
			} else {
				resolvedActiveTriggerIdRef.current = currentActiveTriggerId;
				if (activeTriggerElement !== store.state.activeTriggerElement) stateUpdates.activeTriggerElement = activeTriggerElement;
			}
		} else resolvedActiveTriggerIdRef.current = null;
		if (!lostActiveTriggerId && !currentActiveTriggerId && !store.state.openedWithoutTrigger && triggerCount === 1) {
			const iteratorResult = store.context.triggerElements.entries().next();
			if (!iteratorResult.done) {
				const [implicitTriggerId, implicitTriggerElement] = iteratorResult.value;
				stateUpdates.activeTriggerId = implicitTriggerId;
				stateUpdates.activeTriggerElement = implicitTriggerElement;
				resolvedActiveTriggerIdRef.current = implicitTriggerId;
			}
		}
		if (stateUpdates.triggerCount !== void 0 || stateUpdates.activeTriggerId !== void 0 || stateUpdates.activeTriggerElement !== void 0) store.update(stateUpdates);
		if (lostActiveTriggerId) {
			if (closeOnActiveTriggerUnmount) queueMicrotask(() => {
				if (store.select("open") && store.select("activeTriggerId") === lostActiveTriggerId && !store.context.triggerElements.getById(lostActiveTriggerId)) {
					const eventDetails = createChangeEventDetails(none);
					store.setOpen(false, eventDetails);
					if (!eventDetails.isCanceled) store.update({
						activeTriggerId: null,
						activeTriggerElement: null
					});
				}
			});
		}
	}, [
		open,
		store,
		store.useState("triggerCount"),
		store.useState("activeTriggerId"),
		store.useState("activeTriggerElement"),
		closeOnActiveTriggerUnmount
	]);
}
/**
* Manages the mounted state of the popup.
* Sets up the transition status listeners and handles unmounting when needed.
* Updates the `mounted`, `transitionStatus`, and `preventUnmountingOnClose` states in the store.
*
* @param open Whether the popup is open.
* @param store The Store instance managing the popup state.
* @param onUnmount Optional callback to be called when the popup is unmounted.
* @param animateInitialOpen Whether a popup that mounts already open should still play its enter
*   transition. Defaults to `false`, so content that was open on the first render (a `defaultOpen`
*   popup on page load, SSR'd markup) appears without animating. Opt in for popups whose subtree
*   only mounts in response to something the user did, such as a submenu inside a menu popup.
*
* @returns A function to forcibly unmount the popup. It is a no-op once the popup is already
*   unmounted, so calling it after the automatic unmount doesn't repeat the completion callback.
*/
function useOpenStateTransitions(open, store, onUnmount, animateInitialOpen) {
	const { mounted, transitionStatus, forceUnmount } = useUnmountAfterClose({
		open,
		ref: store.context.popupRef,
		preventUnmountOnClose: store.useState("preventUnmountingOnClose"),
		setPreventUnmountOnClose: (preventUnmountOnClose) => store.set("preventUnmountingOnClose", preventUnmountOnClose),
		animateInitialOpen,
		onUnmount() {
			store.update({
				activeTriggerId: null,
				activeTriggerElement: null,
				mounted: false,
				preventUnmountingOnClose: false
			});
			onUnmount?.();
			store.context.onOpenChangeComplete?.(false);
		}
	});
	useRefWithInit(() => {
		store.set("mounted", mounted);
		return null;
	});
	store.useSyncedValues({
		mounted,
		transitionStatus
	});
	return {
		forceUnmount,
		transitionStatus
	};
}
function usePopupInteractionProps(store, statePart) {
	store.useSyncedValues(statePart);
	useIsoLayoutEffect(() => () => {
		store.update({
			activeTriggerProps: EMPTY_OBJECT,
			inactiveTriggerProps: EMPTY_OBJECT,
			popupProps: EMPTY_OBJECT
		});
	}, [store]);
}
function usePopupRootSync(store, open) {
	useIsoLayoutEffect(() => {
		if (!open && store.state.openMethod !== null) store.set("openMethod", null);
	}, [open, store]);
	useIsoLayoutEffect(() => () => {
		if (store.state.openMethod !== null) store.set("openMethod", null);
	}, [store]);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/safePolygon-ep4133qogeu5vjf3.js
function resolveValue(value, pointerType) {
	if (pointerType != null && !isMouseLikePointerType(pointerType)) return 0;
	if (typeof value === "function") return value();
	return value;
}
function getDelay(value, prop, pointerType) {
	const result = resolveValue(value, pointerType);
	if (typeof result === "number") return result;
	return result?.[prop];
}
function getRestMs(value) {
	if (typeof value === "function") return value();
	return value;
}
function isClickLikeOpenEvent(openEventType, interactedInside) {
	return interactedInside || openEventType === "click" || openEventType === "mousedown";
}
function isHoverOpenEvent(openEventType) {
	return openEventType?.includes("mouse") && openEventType !== "mousedown";
}
var HoverInteraction = class HoverInteraction {
	pointerType = void 0;
	interactedInside = false;
	handler = void 0;
	blockMouseMove = true;
	performedPointerEventsMutation = false;
	pointerEventsScopeElement = null;
	pointerEventsReferenceElement = null;
	pointerEventsFloatingElement = null;
	restTimeoutPending = false;
	openChangeTimeout = new Timeout();
	restTimeout = new Timeout();
	handleCloseOptions = void 0;
	static create() {
		return new HoverInteraction();
	}
	dispose = () => {
		this.openChangeTimeout.clear();
		this.restTimeout.clear();
	};
	disposeEffect = () => {
		return this.dispose;
	};
};
var pointerEventsMutationOwnerByScopeElement = /* @__PURE__ */ new WeakMap();
function clearSafePolygonPointerEventsMutation(instance) {
	if (!instance.performedPointerEventsMutation) return;
	const scopeElement = instance.pointerEventsScopeElement;
	if (scopeElement && pointerEventsMutationOwnerByScopeElement.get(scopeElement) === instance) {
		instance.pointerEventsScopeElement?.style.removeProperty("pointer-events");
		instance.pointerEventsReferenceElement?.style.removeProperty("pointer-events");
		instance.pointerEventsFloatingElement?.style.removeProperty("pointer-events");
		pointerEventsMutationOwnerByScopeElement.delete(scopeElement);
	}
	instance.performedPointerEventsMutation = false;
	instance.pointerEventsScopeElement = null;
	instance.pointerEventsReferenceElement = null;
	instance.pointerEventsFloatingElement = null;
}
function applySafePolygonPointerEventsMutation(instance, options) {
	const { scopeElement, referenceElement, floatingElement } = options;
	const existingOwner = pointerEventsMutationOwnerByScopeElement.get(scopeElement);
	if (existingOwner && existingOwner !== instance) clearSafePolygonPointerEventsMutation(existingOwner);
	clearSafePolygonPointerEventsMutation(instance);
	instance.performedPointerEventsMutation = true;
	instance.pointerEventsScopeElement = scopeElement;
	instance.pointerEventsReferenceElement = referenceElement;
	instance.pointerEventsFloatingElement = floatingElement;
	pointerEventsMutationOwnerByScopeElement.set(scopeElement, instance);
	scopeElement.style.pointerEvents = "none";
	referenceElement.style.pointerEvents = "auto";
	floatingElement.style.pointerEvents = "auto";
}
function useHoverInteractionSharedState(store) {
	const data = store.context.dataRef.current;
	const instance = useRefWithInit(() => data.hoverInteractionState ?? HoverInteraction.create()).current;
	if (!data.hoverInteractionState) data.hoverInteractionState = instance;
	useOnMount(data.hoverInteractionState.disposeEffect);
	return data.hoverInteractionState;
}
/**
* Provides hover interactions that should be attached to the floating element.
*/
function useHoverFloatingInteraction(store, parameters = {}) {
	const { enabled = true, closeDelay: closeDelayProp = 0, nodeId: nodeIdProp } = parameters;
	const open = store.useState("open");
	const floatingElement = store.useState("floatingElement");
	const domReferenceElement = store.useState("domReferenceElement");
	const { dataRef } = store.context;
	const tree = useFloatingTree();
	const parentId = useFloatingParentNodeId();
	const instance = useHoverInteractionSharedState(store);
	const childClosedTimeout = useTimeout();
	const isClickLikeOpenEvent$2 = useStableCallback(() => {
		return isClickLikeOpenEvent(dataRef.current.openEvent?.type, instance.interactedInside);
	});
	const isHoverOpen = useStableCallback(() => {
		return isHoverOpenEvent(dataRef.current.openEvent?.type);
	});
	const clearPointerEvents = useStableCallback(() => {
		clearSafePolygonPointerEventsMutation(instance);
	});
	useIsoLayoutEffect(() => {
		if (!open) {
			instance.pointerType = void 0;
			instance.restTimeoutPending = false;
			instance.interactedInside = false;
			clearPointerEvents();
		}
	}, [
		open,
		instance,
		clearPointerEvents
	]);
	import_react.useEffect(() => {
		return clearPointerEvents;
	}, [clearPointerEvents]);
	useIsoLayoutEffect(() => {
		if (!enabled) return;
		if (open && instance.handleCloseOptions?.blockPointerEvents && isHoverOpen() && isElement(domReferenceElement) && floatingElement) {
			const ref = domReferenceElement;
			const floatingEl = floatingElement;
			const doc = ownerDocument(floatingElement);
			const parentFloating = tree?.nodesRef.current.find((node) => node.id === parentId)?.context?.elements.floating;
			if (parentFloating) parentFloating.style.pointerEvents = "";
			const cachedScopeElement = instance.pointerEventsScopeElement !== floatingEl ? instance.pointerEventsScopeElement : null;
			const parentScopeElement = parentFloating !== floatingEl ? parentFloating : null;
			const scopeElement = instance.handleCloseOptions?.getScope?.() ?? cachedScopeElement ?? parentScopeElement ?? closest(ref, "[data-rootownerid]") ?? doc.body;
			applySafePolygonPointerEventsMutation(instance, {
				scopeElement,
				referenceElement: ref,
				floatingElement: floatingEl
			});
			return () => {
				clearPointerEvents();
			};
		}
	}, [
		enabled,
		open,
		domReferenceElement,
		floatingElement,
		instance,
		isHoverOpen,
		tree,
		parentId,
		clearPointerEvents
	]);
	import_react.useEffect(() => {
		if (!enabled) return;
		function hasParentChildren() {
			return !!(tree && parentId && getNodeChildren(tree.nodesRef.current, parentId).length > 0);
		}
		function closeWithDelay(event) {
			const closeDelay = getDelay(closeDelayProp, "close", instance.pointerType);
			const close = () => {
				store.setOpen(false, createChangeEventDetails(triggerHover, event));
				tree?.events.emit("floating.closed", event);
			};
			if (closeDelay) instance.openChangeTimeout.start(closeDelay, close);
			else {
				instance.openChangeTimeout.clear();
				close();
			}
		}
		function handleInteractInside(event) {
			const target = getTarget(event);
			if (!isInteractiveElement(target)) {
				instance.interactedInside = false;
				return;
			}
			instance.interactedInside = closest(target, "[aria-haspopup]") != null;
		}
		function onFloatingMouseEnter() {
			instance.openChangeTimeout.clear();
			childClosedTimeout.clear();
			tree?.events.off("floating.closed", onNodeClosed);
			clearPointerEvents();
		}
		function onFloatingMouseLeave(event) {
			if (hasParentChildren() && tree) {
				tree.events.on("floating.closed", onNodeClosed);
				return;
			}
			if (isTargetInsideEnabledTrigger(event.relatedTarget, store.context.triggerElements)) return;
			const currentNodeId = dataRef.current.floatingContext?.nodeId ?? nodeIdProp;
			const relatedTarget = event.relatedTarget;
			if (tree && currentNodeId && isElement(relatedTarget) && getNodeChildren(tree.nodesRef.current, currentNodeId, false).some((node) => contains(node.context?.elements.floating, relatedTarget))) return;
			if (instance.handler) {
				instance.handler(event);
				return;
			}
			clearPointerEvents();
			if (isHoverOpen() && !isClickLikeOpenEvent$2()) closeWithDelay(event);
		}
		function onNodeClosed(event) {
			if (!tree || !parentId || hasParentChildren()) return;
			childClosedTimeout.start(0, () => {
				tree.events.off("floating.closed", onNodeClosed);
				store.setOpen(false, createChangeEventDetails(triggerHover, event));
				tree.events.emit("floating.closed", event);
			});
		}
		const floating = floatingElement;
		return mergeCleanups(floating && addEventListener(floating, "mouseenter", onFloatingMouseEnter), floating && addEventListener(floating, "mouseleave", onFloatingMouseLeave), floating && addEventListener(floating, "pointerdown", handleInteractInside, true), () => {
			tree?.events.off("floating.closed", onNodeClosed);
		});
	}, [
		enabled,
		floatingElement,
		store,
		dataRef,
		closeDelayProp,
		nodeIdProp,
		isHoverOpen,
		isClickLikeOpenEvent$2,
		clearPointerEvents,
		instance,
		tree,
		parentId,
		childClosedTimeout
	]);
}
var EMPTY_REF = { current: null };
/**
* Provides hover interactions that should be attached to reference or trigger
* elements.
*/
function useHoverReferenceInteraction(store, props = {}) {
	const { enabled = true, delay = 0, handleClose = null, mouseOnly = false, restMs = 0, move = true, triggerElementRef = EMPTY_REF, externalTree, isActiveTrigger = true, getHandleCloseContext, isClosing, shouldOpen: shouldOpenProp, guardStaleOpen = false } = props;
	const { dataRef, events } = store.context;
	const tree = useFloatingTree(externalTree);
	const instance = useHoverInteractionSharedState(store);
	const isHoverCloseActiveRef = import_react.useRef(false);
	const handleCloseRef = useValueAsRef(handleClose);
	const delayRef = useValueAsRef(delay);
	const restMsRef = useValueAsRef(restMs);
	const enabledRef = useValueAsRef(enabled);
	const shouldOpenRef = useValueAsRef(shouldOpenProp);
	const isClosingRef = useValueAsRef(isClosing);
	const isClickLikeOpenEvent$1 = useStableCallback(() => {
		return isClickLikeOpenEvent(dataRef.current.openEvent?.type, instance.interactedInside);
	});
	const checkShouldOpen = useStableCallback(() => {
		return shouldOpenRef.current?.() !== false;
	});
	const isOverInactiveTrigger = useStableCallback((currentDomReference, currentTarget, target) => {
		const allTriggers = store.context.triggerElements;
		if (allTriggers.hasElement(currentTarget)) return !currentDomReference || !contains(currentDomReference, currentTarget);
		if (!isElement(target)) return false;
		const targetElement = target;
		return allTriggers.hasMatchingElement((trigger) => contains(trigger, targetElement)) && (!currentDomReference || !contains(currentDomReference, targetElement));
	});
	const cleanupMouseMoveHandler = useStableCallback(() => {
		if (!instance.handler) return;
		ownerDocument(store.select("domReferenceElement")).removeEventListener("mousemove", instance.handler);
		instance.handler = void 0;
	});
	const clearPointerEvents = useStableCallback(() => {
		clearSafePolygonPointerEventsMutation(instance);
	});
	if (isActiveTrigger) instance.handleCloseOptions = handleClose?.__options;
	import_react.useEffect(() => cleanupMouseMoveHandler, [cleanupMouseMoveHandler]);
	import_react.useEffect(() => {
		if (!enabled) return;
		function onOpenChangeLocal(details) {
			if (!details.open) {
				isHoverCloseActiveRef.current = details.reason === triggerHover;
				cleanupMouseMoveHandler();
				instance.openChangeTimeout.clear();
				instance.restTimeout.clear();
				instance.blockMouseMove = true;
				instance.restTimeoutPending = false;
			} else isHoverCloseActiveRef.current = false;
		}
		events.on("openchange", onOpenChangeLocal);
		return () => {
			events.off("openchange", onOpenChangeLocal);
		};
	}, [
		enabled,
		events,
		instance,
		cleanupMouseMoveHandler
	]);
	import_react.useEffect(() => {
		if (!enabled) return;
		function closeWithDelay(event, runElseBranch = true) {
			const closeDelay = getDelay(delayRef.current, "close", instance.pointerType);
			if (closeDelay) instance.openChangeTimeout.start(closeDelay, () => {
				store.setOpen(false, createChangeEventDetails(triggerHover, event));
				tree?.events.emit("floating.closed", event);
			});
			else if (runElseBranch) {
				instance.openChangeTimeout.clear();
				store.setOpen(false, createChangeEventDetails(triggerHover, event));
				tree?.events.emit("floating.closed", event);
			}
		}
		const trigger = triggerElementRef.current ?? (isActiveTrigger ? store.select("domReferenceElement") : null);
		if (!isElement(trigger)) return;
		function onMouseEnter(event) {
			instance.openChangeTimeout.clear();
			instance.blockMouseMove = false;
			if (mouseOnly && !isMouseLikePointerType(instance.pointerType)) return;
			const restMsValue = getRestMs(restMsRef.current);
			const openDelay = getDelay(delayRef.current, "open", instance.pointerType);
			const eventTarget = getTarget(event);
			const currentTarget = event.currentTarget ?? null;
			const currentDomReference = store.select("domReferenceElement");
			let triggerNode = currentTarget;
			if (isElement(eventTarget) && !store.context.triggerElements.hasElement(eventTarget)) {
				for (const triggerElement of store.context.triggerElements.elements()) if (contains(triggerElement, eventTarget)) {
					triggerNode = triggerElement;
					break;
				}
			}
			if (isElement(currentTarget) && isElement(currentDomReference) && !store.context.triggerElements.hasElement(currentTarget) && contains(currentTarget, currentDomReference)) triggerNode = currentDomReference;
			const isOverInactive = triggerNode == null ? false : isOverInactiveTrigger(currentDomReference, triggerNode, eventTarget);
			const isOpen = store.select("open");
			const isInClosingTransition = isClosingRef.current?.() ?? store.select("transitionStatus") === "ending";
			const isHoverCloseTransition = !isOpen && isInClosingTransition && isHoverCloseActiveRef.current;
			const isReenteringSameTriggerDuringCloseTransition = !isOverInactive && isElement(triggerNode) && isElement(currentDomReference) && contains(currentDomReference, triggerNode) && isHoverCloseTransition;
			const isRestOnlyDelay = restMsValue > 0 && !openDelay;
			const shouldOpenImmediately = isOverInactive && (isOpen || isHoverCloseTransition) || isReenteringSameTriggerDuringCloseTransition;
			const shouldOpen = !isOpen || isOverInactive;
			if (shouldOpenImmediately) {
				if (checkShouldOpen()) store.setOpen(true, createChangeEventDetails(triggerHover, event, triggerNode));
				return;
			}
			if (isRestOnlyDelay) return;
			if (openDelay) instance.openChangeTimeout.start(openDelay, () => {
				if (shouldOpen && checkShouldOpen()) store.setOpen(true, createChangeEventDetails(triggerHover, event, triggerNode));
			});
			else if (shouldOpen) {
				if (checkShouldOpen()) store.setOpen(true, createChangeEventDetails(triggerHover, event, triggerNode));
			}
		}
		function onMouseLeave(event) {
			if (isClickLikeOpenEvent$1()) {
				clearPointerEvents();
				return;
			}
			cleanupMouseMoveHandler();
			const doc = ownerDocument(store.select("domReferenceElement"));
			instance.restTimeout.clear();
			instance.restTimeoutPending = false;
			const handleCloseContextBase = dataRef.current.floatingContext ?? getHandleCloseContext?.();
			if (isTargetInsideEnabledTrigger(event.relatedTarget, store.context.triggerElements)) return;
			if (handleCloseRef.current && handleCloseContextBase) {
				if (!store.select("open")) instance.openChangeTimeout.clear();
				const currentTrigger = triggerElementRef.current;
				instance.handler = handleCloseRef.current({
					...handleCloseContextBase,
					tree,
					x: event.clientX,
					y: event.clientY,
					onClose() {
						clearPointerEvents();
						cleanupMouseMoveHandler();
						if (enabledRef.current && !isClickLikeOpenEvent$1() && currentTrigger === store.select("domReferenceElement")) closeWithDelay(event, true);
					}
				});
				doc.addEventListener("mousemove", instance.handler);
				instance.handler(event);
				return;
			}
			if (instance.pointerType === "touch" ? !contains(store.select("floatingElement"), event.relatedTarget) : true) closeWithDelay(event);
		}
		function onMouseOut(event) {
			if (contains(trigger, event.relatedTarget)) return;
			instance.openChangeTimeout.clear();
			instance.restTimeout.clear();
			instance.restTimeoutPending = false;
		}
		const staleOpenGuard = guardStaleOpen ? addEventListener(trigger, "mouseout", onMouseOut) : void 0;
		if (move) return mergeCleanups(addEventListener(trigger, "mousemove", onMouseEnter, { once: true }), addEventListener(trigger, "mouseenter", onMouseEnter), addEventListener(trigger, "mouseleave", onMouseLeave), staleOpenGuard);
		return mergeCleanups(addEventListener(trigger, "mouseenter", onMouseEnter), addEventListener(trigger, "mouseleave", onMouseLeave), staleOpenGuard);
	}, [
		cleanupMouseMoveHandler,
		clearPointerEvents,
		dataRef,
		delayRef,
		store,
		enabled,
		handleCloseRef,
		instance,
		isActiveTrigger,
		isOverInactiveTrigger,
		isClickLikeOpenEvent$1,
		mouseOnly,
		move,
		restMsRef,
		triggerElementRef,
		tree,
		enabledRef,
		getHandleCloseContext,
		isClosingRef,
		checkShouldOpen,
		guardStaleOpen
	]);
	return import_react.useMemo(() => {
		if (!enabled) return;
		function setPointerRef(event) {
			instance.pointerType = event.pointerType;
		}
		return {
			onPointerDown: setPointerRef,
			onPointerEnter: setPointerRef,
			onMouseMove(event) {
				const { nativeEvent } = event;
				const trigger = event.currentTarget;
				const currentDomReference = store.select("domReferenceElement");
				const currentOpen = store.select("open");
				const isOverInactive = isOverInactiveTrigger(currentDomReference, trigger, event.target);
				if (mouseOnly && !isMouseLikePointerType(instance.pointerType)) return;
				if (currentOpen && isOverInactive && instance.handleCloseOptions?.blockPointerEvents) {
					const floatingElement = store.select("floatingElement");
					if (floatingElement) {
						const scopeElement = instance.handleCloseOptions?.getScope?.() ?? trigger.ownerDocument.body;
						applySafePolygonPointerEventsMutation(instance, {
							scopeElement,
							referenceElement: trigger,
							floatingElement
						});
					}
				}
				const restMsValue = getRestMs(restMsRef.current);
				if (currentOpen && !isOverInactive || restMsValue === 0) return;
				if (!isOverInactive && instance.restTimeoutPending && event.movementX ** 2 + event.movementY ** 2 < 2) return;
				instance.restTimeout.clear();
				function handleMouseMove() {
					instance.restTimeoutPending = false;
					if (isClickLikeOpenEvent$1()) return;
					const latestOpen = store.select("open");
					if (!instance.blockMouseMove && (!latestOpen || isOverInactive) && checkShouldOpen()) store.setOpen(true, createChangeEventDetails(triggerHover, nativeEvent, trigger));
				}
				if (instance.pointerType === "touch") import_react_dom.flushSync(() => {
					handleMouseMove();
				});
				else if (isOverInactive && currentOpen) handleMouseMove();
				else {
					instance.restTimeoutPending = true;
					instance.restTimeout.start(restMsValue, handleMouseMove);
				}
			}
		};
	}, [
		enabled,
		instance,
		isClickLikeOpenEvent$1,
		isOverInactiveTrigger,
		mouseOnly,
		store,
		restMsRef,
		checkShouldOpen
	]);
}
var CURSOR_SPEED_THRESHOLD = .1;
var CURSOR_SPEED_THRESHOLD_SQUARED = CURSOR_SPEED_THRESHOLD * CURSOR_SPEED_THRESHOLD;
var POLYGON_BUFFER = .5;
function hasIntersectingEdge(pointX, pointY, xi, yi, xj, yj) {
	return yi >= pointY !== yj >= pointY && pointX <= (xj - xi) * (pointY - yi) / (yj - yi) + xi;
}
function isPointInQuadrilateral(pointX, pointY, x1, y1, x2, y2, x3, y3, x4, y4) {
	let isInsideValue = false;
	if (hasIntersectingEdge(pointX, pointY, x1, y1, x2, y2)) isInsideValue = !isInsideValue;
	if (hasIntersectingEdge(pointX, pointY, x2, y2, x3, y3)) isInsideValue = !isInsideValue;
	if (hasIntersectingEdge(pointX, pointY, x3, y3, x4, y4)) isInsideValue = !isInsideValue;
	if (hasIntersectingEdge(pointX, pointY, x4, y4, x1, y1)) isInsideValue = !isInsideValue;
	return isInsideValue;
}
function isInsideRect(pointX, pointY, rect) {
	return pointX >= rect.x && pointX <= rect.x + rect.width && pointY >= rect.y && pointY <= rect.y + rect.height;
}
function isInsideAxisAlignedRect(pointX, pointY, x1, y1, x2, y2) {
	return pointX >= Math.min(x1, x2) && pointX <= Math.max(x1, x2) && pointY >= Math.min(y1, y2) && pointY <= Math.max(y1, y2);
}
/**
* Generates a safe polygon area that the user can traverse without closing the
* floating element once leaving the reference element.
* @see https://floating-ui.com/docs/useHover#safepolygon
*/
function safePolygon(options = {}) {
	const { blockPointerEvents = false } = options;
	const timeout = new Timeout();
	const fn = ({ x, y, placement, elements, onClose, nodeId, tree }) => {
		const side = placement?.split("-")[0];
		let hasLanded = false;
		let lastX = null;
		let lastY = null;
		let lastCursorTime = typeof performance !== "undefined" ? performance.now() : 0;
		function isCursorMovingSlowly(nextX, nextY) {
			const currentTime = performance.now();
			const elapsedTime = currentTime - lastCursorTime;
			if (lastX === null || lastY === null || elapsedTime === 0) {
				lastX = nextX;
				lastY = nextY;
				lastCursorTime = currentTime;
				return false;
			}
			const deltaX = nextX - lastX;
			const deltaY = nextY - lastY;
			const distanceSquared = deltaX * deltaX + deltaY * deltaY;
			const thresholdSquared = elapsedTime * elapsedTime * CURSOR_SPEED_THRESHOLD_SQUARED;
			lastX = nextX;
			lastY = nextY;
			lastCursorTime = currentTime;
			return distanceSquared < thresholdSquared;
		}
		function close() {
			timeout.clear();
			onClose();
		}
		return function onMouseMove(event) {
			timeout.clear();
			const domReference = elements.domReference;
			const floating = elements.floating;
			if (!domReference || !floating || side == null || x == null || y == null) return;
			const { clientX, clientY } = event;
			const target = getTarget(event);
			const isLeave = event.type === "mouseleave";
			const isOverFloatingEl = contains(floating, target);
			const isOverReferenceEl = contains(domReference, target);
			if (isOverFloatingEl) {
				hasLanded = true;
				if (!isLeave) return;
			}
			if (isOverReferenceEl) {
				hasLanded = false;
				if (!isLeave) {
					hasLanded = true;
					return;
				}
			}
			if (isLeave && isElement(event.relatedTarget) && contains(floating, event.relatedTarget)) return;
			function hasOpenChildNode() {
				return Boolean(tree && getNodeChildren(tree.nodesRef.current, nodeId).length > 0);
			}
			function closeIfNoOpenChild() {
				if (!hasOpenChildNode()) close();
			}
			if (hasOpenChildNode()) return;
			const refRect = domReference.getBoundingClientRect();
			const rect = floating.getBoundingClientRect();
			const cursorLeaveFromRight = x > rect.right - rect.width / 2;
			const cursorLeaveFromBottom = y > rect.bottom - rect.height / 2;
			const isFloatingWider = rect.width > refRect.width;
			const isFloatingTaller = rect.height > refRect.height;
			const left = (isFloatingWider ? refRect : rect).left;
			const right = (isFloatingWider ? refRect : rect).right;
			const top = (isFloatingTaller ? refRect : rect).top;
			const bottom = (isFloatingTaller ? refRect : rect).bottom;
			if (side === "top" && y >= refRect.bottom - 1 || side === "bottom" && y <= refRect.top + 1 || side === "left" && x >= refRect.right - 1 || side === "right" && x <= refRect.left + 1) {
				closeIfNoOpenChild();
				return;
			}
			let isInsideTroughRect = false;
			switch (side) {
				case "top":
					isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, left, refRect.top + 1, right, rect.bottom - 1);
					break;
				case "bottom":
					isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, left, rect.top + 1, right, refRect.bottom - 1);
					break;
				case "left":
					isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, rect.right - 1, bottom, refRect.left + 1, top);
					break;
				case "right": isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, refRect.right - 1, bottom, rect.left + 1, top);
			}
			if (isInsideTroughRect) return;
			if (hasLanded && !isInsideRect(clientX, clientY, refRect)) {
				closeIfNoOpenChild();
				return;
			}
			if (!isLeave && isCursorMovingSlowly(clientX, clientY)) {
				closeIfNoOpenChild();
				return;
			}
			let isInsidePolygon = false;
			switch (side) {
				case "top": {
					const cursorXOffset = isFloatingWider ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
					const cursorPointOneX = isFloatingWider ? x + cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
					const cursorPointTwoX = isFloatingWider ? x - cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
					const cursorPointY = y + POLYGON_BUFFER + 1;
					const commonYLeft = cursorLeaveFromRight ? rect.bottom - POLYGON_BUFFER : isFloatingWider ? rect.bottom - POLYGON_BUFFER : rect.top;
					const commonYRight = cursorLeaveFromRight ? isFloatingWider ? rect.bottom - POLYGON_BUFFER : rect.top : rect.bottom - POLYGON_BUFFER;
					isInsidePolygon = isPointInQuadrilateral(clientX, clientY, cursorPointOneX, cursorPointY, cursorPointTwoX, cursorPointY, rect.left, commonYLeft, rect.right, commonYRight);
					break;
				}
				case "bottom": {
					const cursorXOffset = isFloatingWider ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
					const cursorPointOneX = isFloatingWider ? x + cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
					const cursorPointTwoX = isFloatingWider ? x - cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
					const cursorPointY = y - POLYGON_BUFFER;
					const commonYLeft = cursorLeaveFromRight ? rect.top + POLYGON_BUFFER : isFloatingWider ? rect.top + POLYGON_BUFFER : rect.bottom;
					const commonYRight = cursorLeaveFromRight ? isFloatingWider ? rect.top + POLYGON_BUFFER : rect.bottom : rect.top + POLYGON_BUFFER;
					isInsidePolygon = isPointInQuadrilateral(clientX, clientY, cursorPointOneX, cursorPointY, cursorPointTwoX, cursorPointY, rect.left, commonYLeft, rect.right, commonYRight);
					break;
				}
				case "left": {
					const cursorYOffset = isFloatingTaller ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
					const cursorPointOneY = isFloatingTaller ? y + cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
					const cursorPointTwoY = isFloatingTaller ? y - cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
					const cursorPointX = x + POLYGON_BUFFER + 1;
					const commonXTop = cursorLeaveFromBottom ? rect.right - POLYGON_BUFFER : isFloatingTaller ? rect.right - POLYGON_BUFFER : rect.left;
					const commonXBottom = cursorLeaveFromBottom ? isFloatingTaller ? rect.right - POLYGON_BUFFER : rect.left : rect.right - POLYGON_BUFFER;
					isInsidePolygon = isPointInQuadrilateral(clientX, clientY, commonXTop, rect.top, commonXBottom, rect.bottom, cursorPointX, cursorPointOneY, cursorPointX, cursorPointTwoY);
					break;
				}
				case "right": {
					const cursorYOffset = isFloatingTaller ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
					const cursorPointOneY = isFloatingTaller ? y + cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
					const cursorPointTwoY = isFloatingTaller ? y - cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
					const cursorPointX = x - POLYGON_BUFFER;
					const commonXTop = cursorLeaveFromBottom ? rect.left + POLYGON_BUFFER : isFloatingTaller ? rect.left + POLYGON_BUFFER : rect.right;
					const commonXBottom = cursorLeaveFromBottom ? isFloatingTaller ? rect.left + POLYGON_BUFFER : rect.right : rect.left + POLYGON_BUFFER;
					isInsidePolygon = isPointInQuadrilateral(clientX, clientY, cursorPointX, cursorPointOneY, cursorPointX, cursorPointTwoY, commonXTop, rect.top, commonXBottom, rect.bottom);
					break;
				}
			}
			if (!isInsidePolygon) closeIfNoOpenChild();
			else if (!hasLanded) timeout.start(40, closeIfNoOpenChild);
		};
	};
	fn.__options = {
		...options,
		blockPointerEvents
	};
	return fn;
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/NullStore-my62xo2vfcfkerri.js
/**
* State common to all popup stores.
*/
function createInitialPopupStoreState(triggerElements, floatingId, nested = false) {
	return {
		open: false,
		openProp: void 0,
		mounted: false,
		transitionStatus: void 0,
		floatingRootContext: new FloatingRootStore({
			open: false,
			transitionStatus: void 0,
			floatingElement: null,
			referenceElement: null,
			triggerElements,
			floatingId,
			syncOnly: true,
			nested,
			onOpenChange: void 0
		}),
		floatingId,
		triggerCount: 0,
		preventUnmountingOnClose: false,
		payload: void 0,
		activeTriggerId: null,
		activeTriggerElement: null,
		openedWithoutTrigger: false,
		triggerIdProp: void 0,
		popupElement: null,
		positionerElement: null,
		activeTriggerProps: EMPTY_OBJECT,
		inactiveTriggerProps: EMPTY_OBJECT,
		popupProps: EMPTY_OBJECT
	};
}
var activeTriggerIdSelector = (state) => state.triggerIdProp ?? state.activeTriggerId;
var openSelector = (state) => state.openProp ?? state.open;
var popupIdSelector = (state) => {
	return (state.popupElement?.id ?? state.floatingId) || void 0;
};
function triggerOwnsOpenPopup(state, triggerId) {
	return triggerId !== void 0 && openSelector(state) && activeTriggerIdSelector(state) === triggerId;
}
function triggerOwnsOpenPopupOrIsOnlyTrigger(state, triggerId) {
	if (triggerOwnsOpenPopup(state, triggerId)) return true;
	return triggerId !== void 0 && openSelector(state) && activeTriggerIdSelector(state) == null && !state.openedWithoutTrigger && state.triggerCount === 1;
}
var popupStoreSelectors = {
	open: openSelector,
	mounted: (state) => state.mounted,
	transitionStatus: (state) => openSelector(state) && !state.mounted ? "starting" : state.transitionStatus,
	floatingRootContext: (state) => state.floatingRootContext,
	triggerCount: (state) => state.triggerCount,
	preventUnmountingOnClose: (state) => state.preventUnmountingOnClose,
	payload: (state) => state.payload,
	activeTriggerId: activeTriggerIdSelector,
	activeTriggerElement: (state) => state.mounted ? state.activeTriggerElement : null,
	popupId: popupIdSelector,
	/**
	* Whether the trigger with the given ID was used to open the popup.
	*/
	isTriggerActive: (state, triggerId) => triggerId !== void 0 && activeTriggerIdSelector(state) === triggerId,
	/**
	* Whether the popup is open and was activated by a trigger with the given ID.
	*/
	isOpenedByTrigger: (state, triggerId) => triggerOwnsOpenPopup(state, triggerId),
	/**
	* Whether the popup is mounted and was activated by a trigger with the given ID.
	*/
	isMountedByTrigger: (state, triggerId) => triggerId !== void 0 && activeTriggerIdSelector(state) === triggerId && state.mounted,
	triggerProps: (state, isActive) => isActive ? state.activeTriggerProps : state.inactiveTriggerProps,
	/**
	* Popup id for the trigger that currently owns the open popup.
	*/
	triggerPopupId: (state, triggerId) => triggerOwnsOpenPopupOrIsOnlyTrigger(state, triggerId) ? popupIdSelector(state) : void 0,
	popupProps: (state) => state.popupProps,
	popupElement: (state) => state.popupElement,
	positionerElement: (state) => state.positionerElement
};
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/usePopupHandleStore-gawjmfjf1xdgiph3.js
/**
* Reads the store currently exposed by a popup handle and subscribes to store-pointer changes.
* Detached triggers use this to follow a handle as a root attaches or detaches: while no root is
* attached, the handle exposes its fallback store; once a root attaches, subscribers re-render and
* read from the live root store.
*
* Returns `undefined` when no handle is provided so callers can fall back to their root context.
*
* @param handle The popup handle to read from, or `undefined` when the trigger is not handle-bound.
*/
function usePopupHandleStore(handle) {
	const subscribe = import_react.useCallback((listener) => {
		if (handle === void 0) return NOOP;
		return handle.subscribeStore(listener);
	}, [handle]);
	const getSnapshot = import_react.useCallback(() => {
		return handle === void 0 ? void 0 : handle.store;
	}, [handle]);
	return (0, import_shim.useSyncExternalStore)(subscribe, getSnapshot, () => handle?.serverStore);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useFocus-mn7a9t9v6fnlb4mf.js
var isMacSafari = mac && webkit;
/**
* Opens the floating element while the reference element has focus, like CSS
* `:focus`.
* @see https://floating-ui.com/docs/useFocus
*/
function useFocus(store, props = {}) {
	const { enabled = true, delay } = props;
	const { events, dataRef } = store.context;
	const blockFocusRef = import_react.useRef(false);
	const blockedReferenceRef = import_react.useRef(null);
	const keyboardModalityRef = import_react.useRef(true);
	const timeout = useTimeout();
	import_react.useEffect(() => {
		const domReference = store.select("domReferenceElement");
		if (!enabled) return;
		const win = getWindow(domReference);
		function onBlur() {
			const currentDomReference = store.select("domReferenceElement");
			if (!store.select("open") && isHTMLElement(currentDomReference) && currentDomReference === activeElement(ownerDocument(currentDomReference))) {
				blockFocusRef.current = true;
				blockedReferenceRef.current = currentDomReference;
			}
		}
		function onKeyDown() {
			keyboardModalityRef.current = true;
		}
		function onPointerDown() {
			keyboardModalityRef.current = false;
		}
		return mergeCleanups(addEventListener(win, "blur", onBlur), isMacSafari && addEventListener(win, "keydown", onKeyDown, true), isMacSafari && addEventListener(win, "pointerdown", onPointerDown, true));
	}, [store, enabled]);
	import_react.useEffect(() => {
		if (!enabled) return;
		function onOpenChangeLocal(details) {
			if (details.reason === "trigger-press" || details.reason === "escape-key") {
				const referenceElement = store.select("domReferenceElement");
				if (isElement(referenceElement)) {
					blockedReferenceRef.current = referenceElement;
					blockFocusRef.current = true;
				}
			}
		}
		events.on("openchange", onOpenChangeLocal);
		return () => {
			events.off("openchange", onOpenChangeLocal);
		};
	}, [
		events,
		enabled,
		store
	]);
	const reference = import_react.useMemo(() => {
		function resetBlockedFocus() {
			blockFocusRef.current = false;
			blockedReferenceRef.current = null;
		}
		return {
			onMouseLeave() {
				resetBlockedFocus();
			},
			onFocus(event) {
				const focusTarget = event.currentTarget;
				if (blockFocusRef.current) {
					if (blockedReferenceRef.current === focusTarget) return;
					resetBlockedFocus();
				}
				const target = getTarget(event.nativeEvent);
				if (isElement(target)) {
					if (isMacSafari && !event.relatedTarget) {
						if (!keyboardModalityRef.current && !isTypeableElement(target)) return;
					} else if (!matchesFocusVisible(target)) return;
				}
				const movedFromOtherEnabledTrigger = isTargetInsideEnabledTrigger(event.relatedTarget, store.context.triggerElements);
				const { nativeEvent, currentTarget } = event;
				if (store.select("open") && movedFromOtherEnabledTrigger || !delay) {
					store.setOpen(true, createChangeEventDetails(triggerFocus, nativeEvent, currentTarget));
					return;
				}
				timeout.start(delay, () => {
					if (blockFocusRef.current) return;
					store.setOpen(true, createChangeEventDetails(triggerFocus, nativeEvent, currentTarget));
				});
			},
			onBlur(event) {
				resetBlockedFocus();
				const relatedTarget = event.relatedTarget;
				const nativeEvent = event.nativeEvent;
				const movedToFocusGuard = isElement(relatedTarget) && relatedTarget.hasAttribute(createAttribute("focus-guard")) && relatedTarget.getAttribute("data-type") === "outside";
				timeout.start(0, () => {
					const domReference = store.select("domReferenceElement");
					const activeEl = activeElement(ownerDocument(domReference));
					if (!relatedTarget && activeEl === domReference) return;
					if (contains(dataRef.current.floatingContext?.refs.floating.current, activeEl) || contains(domReference, activeEl) || movedToFocusGuard) return;
					if (isTargetInsideEnabledTrigger(relatedTarget ?? activeEl, store.context.triggerElements)) return;
					store.setOpen(false, createChangeEventDetails(triggerFocus, nativeEvent));
				});
			}
		};
	}, [
		dataRef,
		delay,
		store,
		timeout
	]);
	return import_react.useMemo(() => enabled ? {
		reference,
		trigger: reference
	} : {}, [enabled, reference]);
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/useBaseUiId-nk4k7nj9h1cy76ny.js
/**
* Wraps `useId` and prefixes generated `id`s with `base-ui-`
* @param {string | undefined} idOverride overrides the generated id when provided
* @returns {string | undefined}
*/
function useBaseUiId(idOverride) {
	return useId$1(idOverride, "base-ui");
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/FloatingPortalLite-j7dsy7gokbxdoe1i.js
/**
* `FloatingPortal` includes tabbable logic handling for focus management.
* For components that don't need tabbable logic, use `FloatingPortalLite`.
* @internal
*/
var FloatingPortalLite = /*#__PURE__*/ import_react.forwardRef(function FloatingPortalLite(componentProps, forwardedRef) {
	const { children, container, className, render, style, ...elementProps } = componentProps;
	const { node: portalNode, subtree: portalSubtree } = useFloatingPortalNode({
		container,
		ref: forwardedRef,
		componentProps,
		elementProps
	});
	if (!portalSubtree && !portalNode) return null;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [portalSubtree, portalNode && /*#__PURE__*/ import_react_dom.createPortal(children, portalNode)] });
});
FloatingPortalLite.displayName = "FloatingPortalLite";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/DirectionContext-kpby968j030psajn.js
var DirectionContext = /*#__PURE__*/ import_react.createContext(void 0);
DirectionContext.displayName = "DirectionContext";
function useDirection() {
	return import_react.useContext(DirectionContext)?.direction ?? "ltr";
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/usePositioner-mzvgnazldqvy44z2.js
/**
* Provides data to position a floating element and context to add interactions.
* The caller supplies the root store, which owns the reference and floating elements.
* @see https://floating-ui.com/docs/useFloating
*/
function useBaseUIFloating(options) {
	const { nodeId, externalTree, rootContext: store } = options;
	const referenceElement = store.useState("referenceElement");
	const floatingElement = store.useState("floatingElement");
	const domReferenceElement = store.useState("domReferenceElement");
	const open = store.useState("open");
	const floatingId = store.useState("floatingId");
	const [positionReference, setPositionReferenceRaw] = import_react.useState(null);
	const domReferenceRef = import_react.useRef(null);
	const tree = useFloatingTree(externalTree);
	const storeElements = import_react.useMemo(() => ({
		reference: referenceElement,
		floating: floatingElement,
		domReference: domReferenceElement
	}), [
		referenceElement,
		floatingElement,
		domReferenceElement
	]);
	const position = useFloating({
		...options,
		elements: {
			...storeElements,
			...positionReference && { reference: positionReference }
		}
	});
	const setPositionReference = import_react.useCallback((node) => {
		const computedPositionReference = isElement(node) ? {
			getBoundingClientRect: () => node.getBoundingClientRect(),
			getClientRects: () => node.getClientRects(),
			contextElement: node
		} : node;
		setPositionReferenceRaw(computedPositionReference);
		position.refs.setReference(computedPositionReference);
	}, [position.refs]);
	const refs = import_react.useMemo(() => ({
		...position.refs,
		setPositionReference,
		domReference: domReferenceRef
	}), [position.refs, setPositionReference]);
	const elements = import_react.useMemo(() => ({
		...position.elements,
		domReference: domReferenceElement
	}), [position.elements, domReferenceElement]);
	const context = import_react.useMemo(() => ({
		...position,
		dataRef: store.context.dataRef,
		open,
		onOpenChange: store.setOpen,
		events: store.context.events,
		floatingId,
		refs,
		elements,
		nodeId,
		rootStore: store
	}), [
		position,
		refs,
		elements,
		nodeId,
		store,
		open,
		floatingId
	]);
	useIsoLayoutEffect(() => {
		if (domReferenceElement) domReferenceRef.current = domReferenceElement;
	}, [domReferenceElement]);
	useIsoLayoutEffect(() => {
		store.context.dataRef.current.floatingContext = context;
		const node = tree?.nodesRef.current.find((n) => n.id === nodeId);
		if (node) node.context = context;
	});
	return import_react.useMemo(() => ({
		...position,
		context,
		refs,
		elements,
		rootStore: store
	}), [
		position,
		refs,
		elements,
		context,
		store
	]);
}
/**
* Fork of the original `arrow` middleware from Floating UI that always uses the floating element
* as the arrow's offset parent.
*/
var baseArrow = (options) => ({
	name: "arrow",
	options,
	async fn(state) {
		const { x, y, placement, rects, platform, elements, middlewareData } = state;
		const { element, padding = 0 } = evaluate(options, state) || {};
		if (element == null) return {};
		const paddingObject = getPaddingObject(padding);
		const coords = {
			x,
			y
		};
		const axis = getAlignmentAxis(placement);
		const length = getAxisLength(axis);
		const arrowDimensions = await platform.getDimensions(element);
		const isYAxis = axis === "y";
		const minProp = isYAxis ? "top" : "left";
		const maxProp = isYAxis ? "bottom" : "right";
		const clientProp = isYAxis ? "clientHeight" : "clientWidth";
		const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
		const startDiff = coords[axis] - rects.reference[axis];
		const clientSize = elements.floating[clientProp] || rects.floating[length];
		const centerToReference = endDiff / 2 - startDiff / 2;
		const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
		const minPadding = Math.min(paddingObject[minProp], largestPossiblePadding);
		const maxPadding = Math.min(paddingObject[maxProp], largestPossiblePadding);
		const min = minPadding;
		const max = clientSize - arrowDimensions[length] - maxPadding;
		const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
		const offset = clamp(min, center, max);
		const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
		const alignmentOffset = shouldAddOffset ? center < min ? center - min : center - max : 0;
		return {
			[axis]: coords[axis] + alignmentOffset,
			data: {
				[axis]: offset,
				centerOffset: center - offset - alignmentOffset,
				...shouldAddOffset && { alignmentOffset }
			},
			reset: shouldAddOffset
		};
	}
});
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* This wraps the core `arrow` middleware to allow React refs as the element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow = (options, deps) => {
	const { name, fn } = baseArrow(options);
	return {
		name,
		fn,
		options: [options, deps]
	};
};
var hide = {
	name: "hide",
	async fn(state) {
		const { width, height, x, y } = state.rects.reference;
		const anchorHidden = width === 0 && height === 0 && x === 0 && y === 0;
		const overflow = await state.platform.detectOverflow(state, { elementContext: "reference" });
		return { data: { referenceHidden: overflow.top - height >= 0 || overflow.right - width >= 0 || overflow.bottom - height >= 0 || overflow.left - width >= 0 || anchorHidden } };
	}
};
var DEFAULT_SIDES = {
	sideX: "left",
	sideY: "top"
};
/**
* The available width between the trigger and the edge of the viewport.
* @type {number}
*/
var availableWidth = "--available-width";
/**
* The available height between the trigger and the edge of the viewport.
* @type {number}
*/
var availableHeight = "--available-height";
/**
* The anchor's width.
* @type {number}
*/
var anchorWidth = "--anchor-width";
/**
* The anchor's height.
* @type {number}
*/
var anchorHeight = "--anchor-height";
/**
* The coordinates that this element is anchored to. Used for animations and transitions.
* @type {string}
*/
var transformOrigin = "--transform-origin";
var AVAILABLE_WIDTH_VAR = availableWidth;
var AVAILABLE_HEIGHT_VAR = availableHeight;
function getLogicalSide(sideParam, renderedSide, isRtl) {
	const isLogicalSideParam = sideParam === "inline-start" || sideParam === "inline-end";
	return {
		top: "top",
		right: isLogicalSideParam ? isRtl ? "inline-start" : "inline-end" : "right",
		bottom: "bottom",
		left: isLogicalSideParam ? isRtl ? "inline-end" : "inline-start" : "left"
	}[renderedSide];
}
function getOffsetData(state, sideParam, isRtl) {
	const { rects, placement } = state;
	return {
		side: getLogicalSide(sideParam, getSide(placement), isRtl),
		align: getAlignment(placement) || "center",
		anchor: {
			width: rects.reference.width,
			height: rects.reference.height
		},
		positioner: {
			width: rects.floating.width,
			height: rects.floating.height
		}
	};
}
/**
* Provides standardized anchor positioning behavior for floating elements. Wraps Floating UI's
* `useFloating` hook.
*/
function useAnchorPositioning(params) {
	return useAnchorPositioningWithHook(params, useBaseUIFloating);
}
function useAnchorPositioningWithHook(params, useFloatingHook) {
	const { anchor, positionMethod = "absolute", side: sideParam = "bottom", sideOffset = 0, align = "center", alignOffset = 0, collisionBoundary, collisionPadding: collisionPaddingParam = 5, sticky = false, arrowPadding = 5, disableAnchorTracking = false, inline: inlineMiddleware, keepMounted = false, floatingRootContext, mounted, collisionAvoidance, shift: shift$1, nodeId, adaptiveOrigin, lazyFlip = false, externalTree } = params;
	const collisionAvoidanceSide = collisionAvoidance.side || "flip";
	const collisionAvoidanceAlign = collisionAvoidance.align || "flip";
	const collisionAvoidanceFallbackAxisSide = collisionAvoidance.fallbackAxisSide || "end";
	const shiftCrossAxis = shift$1?.crossAxis ?? false;
	const shiftRootBoundary = shift$1?.rootBoundary;
	const anchorFn = typeof anchor === "function" ? anchor : void 0;
	const anchorFnCallback = useStableCallback(anchorFn);
	const anchorDep = anchorFn ? anchorFnCallback : anchor;
	const anchorValueRef = useValueAsRef(anchor);
	const mountedRef = useValueAsRef(mounted);
	const isRtl = useDirection() === "rtl";
	const [mountPlacement, setMountPlacement] = import_react.useState(null);
	if (!mounted && mountPlacement !== null) setMountPlacement(null);
	const lockAlign = lazyFlip === "placement";
	const mountSide = mountPlacement ? getSide(mountPlacement) : null;
	const mountAlign = mountPlacement && lockAlign ? getAlignment(mountPlacement) || "center" : null;
	const side = mountSide || {
		top: "top",
		right: "right",
		bottom: "bottom",
		left: "left",
		"inline-end": isRtl ? "left" : "right",
		"inline-start": isRtl ? "right" : "left"
	}[sideParam];
	const placementAlign = mountAlign || align;
	const placement = placementAlign === "center" ? side : `${side}-${placementAlign}`;
	let collisionPadding = collisionPaddingParam;
	if (typeof collisionPadding === "number") collisionPadding = {
		top: collisionPadding,
		right: collisionPadding,
		bottom: collisionPadding,
		left: collisionPadding
	};
	else if (collisionPadding) collisionPadding = {
		top: collisionPadding.top || 0,
		right: collisionPadding.right || 0,
		bottom: collisionPadding.bottom || 0,
		left: collisionPadding.left || 0
	};
	const bias = 1;
	const biasTop = sideParam === "bottom" ? bias : 0;
	const biasBottom = sideParam === "top" ? bias : 0;
	const biasLeft = sideParam === "right" ? bias : 0;
	const biasRight = sideParam === "left" ? bias : 0;
	const commonCollisionProps = {
		boundary: collisionBoundary === "clipping-ancestors" ? "clippingAncestors" : collisionBoundary,
		padding: collisionPadding
	};
	const arrowRef = import_react.useRef(null);
	const sideOffsetRef = useValueAsRef(sideOffset);
	const alignOffsetRef = useValueAsRef(alignOffset);
	const sideOffsetDep = typeof sideOffset !== "function" ? sideOffset : 0;
	const alignOffsetDep = typeof alignOffset !== "function" ? alignOffset : 0;
	const middleware = [];
	if (inlineMiddleware) middleware.push(inlineMiddleware);
	middleware.push(offset((state) => {
		const data = getOffsetData(state, sideParam, isRtl);
		const sideAxis = typeof sideOffsetRef.current === "function" ? sideOffsetRef.current(data) : sideOffsetRef.current;
		const alignAxis = typeof alignOffsetRef.current === "function" ? alignOffsetRef.current(data) : alignOffsetRef.current;
		return {
			mainAxis: sideAxis,
			crossAxis: alignAxis,
			alignmentAxis: alignAxis
		};
	}, [
		sideOffsetDep,
		alignOffsetDep,
		isRtl,
		sideParam
	]));
	const shiftDisabled = collisionAvoidanceAlign === "none" && collisionAvoidanceSide !== "shift";
	const crossAxisShiftEnabled = !shiftDisabled && (sticky || shiftCrossAxis || collisionAvoidanceSide === "shift");
	const flipMiddleware = collisionAvoidanceSide === "none" ? null : flip({
		...commonCollisionProps,
		padding: {
			top: collisionPadding.top + bias + biasTop,
			right: collisionPadding.right + bias + biasRight,
			bottom: collisionPadding.bottom + bias + biasBottom,
			left: collisionPadding.left + bias + biasLeft
		},
		mainAxis: !shiftCrossAxis && collisionAvoidanceSide === "flip",
		crossAxis: collisionAvoidanceAlign === "flip" ? "alignment" : false,
		fallbackAxisSideDirection: collisionAvoidanceFallbackAxisSide
	});
	const shiftMiddleware = shiftDisabled ? null : shift({
		...commonCollisionProps,
		rootBoundary: shiftRootBoundary,
		mainAxis: collisionAvoidanceAlign !== "none",
		crossAxis: crossAxisShiftEnabled,
		limiter: sticky || shiftCrossAxis ? void 0 : limitShift((limitData) => {
			if (!arrowRef.current) return {};
			const { width, height } = arrowRef.current.getBoundingClientRect();
			const sideAxis = getSideAxis(getSide(limitData.placement));
			const arrowSize = sideAxis === "y" ? width : height;
			const offsetAmount = sideAxis === "y" ? collisionPadding.left + collisionPadding.right : collisionPadding.top + collisionPadding.bottom;
			return { offset: arrowSize / 2 + offsetAmount / 2 };
		})
	}, [
		commonCollisionProps,
		sticky,
		shiftCrossAxis,
		shiftRootBoundary,
		collisionPadding,
		collisionAvoidanceAlign
	]);
	if (collisionAvoidanceSide === "shift" || collisionAvoidanceAlign === "shift" || placementAlign === "center") middleware.push(shiftMiddleware, flipMiddleware);
	else middleware.push(flipMiddleware, shiftMiddleware);
	middleware.push(size({
		...commonCollisionProps,
		apply({ elements: { floating }, availableWidth, availableHeight, rects }) {
			if (!mountedRef.current) return;
			const floatingStyle = floating.style;
			floatingStyle.setProperty(AVAILABLE_WIDTH_VAR, `${availableWidth}px`);
			floatingStyle.setProperty(AVAILABLE_HEIGHT_VAR, `${availableHeight}px`);
			const dpr = getWindow(floating).devicePixelRatio || 1;
			const { x, y, width, height } = rects.reference;
			const anchorWidth$1 = (Math.round((x + width) * dpr) - Math.round(x * dpr)) / dpr;
			const anchorHeight$1 = (Math.round((y + height) * dpr) - Math.round(y * dpr)) / dpr;
			floatingStyle.setProperty(anchorWidth, `${anchorWidth$1}px`);
			floatingStyle.setProperty(anchorHeight, `${anchorHeight$1}px`);
		}
	}), arrow((state) => ({
		element: arrowRef.current || ownerDocument(state.elements.floating).createElement("div"),
		padding: arrowRef.current ? arrowPadding : 0
	}), [arrowPadding]), {
		name: "transformOrigin",
		fn(state) {
			const { elements: { floating }, middlewareData, placement: renderedPlacement, platform, rects, y } = state;
			const renderedSide = getSide(renderedPlacement);
			const renderedAlign = getAlignment(renderedPlacement);
			const isVertical = getSideAxis(renderedSide) === "y";
			const arrowEl = arrowRef.current;
			const sideOffsetValue = typeof sideOffset === "function" ? sideOffset(getOffsetData(state, sideParam, isRtl)) : sideOffset;
			let crossOrigin;
			if (!arrowEl && renderedAlign && Math.abs(isVertical ? middlewareData.shift?.x || 0 : middlewareData.shift?.y || 0) <= 1) crossOrigin = renderedAlign === "start" === (isVertical && platform.isRTL?.(floating) === true) ? "100%" : "0%";
			else crossOrigin = `${(isVertical ? middlewareData.arrow?.x || 0 : middlewareData.arrow?.y || 0) + (isVertical ? arrowEl?.clientWidth || 0 : arrowEl?.clientHeight || 0) / 2}px`;
			let sideOrigin = renderedSide === "top" || renderedSide === "left" ? `calc(100% + ${sideOffsetValue}px)` : `${-sideOffsetValue}px`;
			if (crossAxisShiftEnabled && isVertical && Math.abs(middlewareData.shift?.y || 0) > sideOffsetValue) sideOrigin = `${rects.reference.y + rects.reference.height / 2 - y}px`;
			floating.style.setProperty(transformOrigin, isVertical ? `${crossOrigin} ${sideOrigin}` : `${sideOrigin} ${crossOrigin}`);
			return {};
		}
	}, hide, adaptiveOrigin);
	useIsoLayoutEffect(() => {
		if (!mounted && floatingRootContext) floatingRootContext.update({
			referenceElement: null,
			floatingElement: null,
			domReferenceElement: null,
			positionReference: null
		});
	}, [mounted, floatingRootContext]);
	const autoUpdateOptions = import_react.useMemo(() => ({
		ancestorScroll: !disableAnchorTracking,
		elementResize: !disableAnchorTracking && typeof ResizeObserver !== "undefined",
		layoutShift: !disableAnchorTracking && typeof IntersectionObserver !== "undefined"
	}), [disableAnchorTracking]);
	const { refs, elements, x, y, middlewareData, update, placement: renderedPlacement, context, isPositioned, floatingStyles: originalFloatingStyles } = useFloatingHook({
		rootContext: floatingRootContext,
		open: keepMounted ? mounted : void 0,
		placement,
		middleware,
		strategy: positionMethod,
		whileElementsMounted: keepMounted ? void 0 : (...args) => autoUpdate(...args, autoUpdateOptions),
		nodeId,
		externalTree
	});
	const { sideX, sideY } = middlewareData.adaptiveOrigin || DEFAULT_SIDES;
	const resolvedPosition = isPositioned ? positionMethod : "fixed";
	const floatingStyles = import_react.useMemo(() => {
		let base;
		if (!isPositioned) base = {
			position: resolvedPosition,
			top: 0,
			left: 0
		};
		else if (adaptiveOrigin) base = {
			position: resolvedPosition,
			[sideX]: x,
			[sideY]: y
		};
		else base = {
			...originalFloatingStyles,
			position: resolvedPosition
		};
		base[AVAILABLE_WIDTH_VAR] = "100vw";
		base[AVAILABLE_HEIGHT_VAR] = "100vh";
		if (!isPositioned) base.opacity = 0;
		return base;
	}, [
		adaptiveOrigin,
		resolvedPosition,
		sideX,
		x,
		sideY,
		y,
		originalFloatingStyles,
		isPositioned
	]);
	const registeredPositionReferenceRef = import_react.useRef(null);
	useIsoLayoutEffect(() => {
		if (!mounted) return;
		const anchorValue = anchorValueRef.current;
		const resolvedAnchor = typeof anchorValue === "function" ? anchorValue() : anchorValue;
		const finalAnchor = (isRef(resolvedAnchor) ? resolvedAnchor.current : resolvedAnchor) || null;
		if (finalAnchor !== registeredPositionReferenceRef.current) {
			refs.setPositionReference(finalAnchor);
			registeredPositionReferenceRef.current = finalAnchor;
		}
	}, [
		mounted,
		refs,
		anchorDep,
		anchorValueRef
	]);
	import_react.useEffect(() => {
		if (!mounted) return;
		const anchorValue = anchorValueRef.current;
		if (typeof anchorValue === "function") return;
		if (isRef(anchorValue) && anchorValue.current !== registeredPositionReferenceRef.current) {
			refs.setPositionReference(anchorValue.current);
			registeredPositionReferenceRef.current = anchorValue.current;
		}
	}, [
		mounted,
		refs,
		anchorDep,
		anchorValueRef
	]);
	import_react.useEffect(() => {
		if (keepMounted && mounted && elements.reference && elements.floating) return autoUpdate(elements.reference, elements.floating, update, autoUpdateOptions);
	}, [
		keepMounted,
		mounted,
		elements,
		update,
		autoUpdateOptions
	]);
	const renderedSide = getSide(renderedPlacement);
	const logicalRenderedSide = getLogicalSide(sideParam, renderedSide, isRtl);
	const renderedAlign = getAlignment(renderedPlacement) || "center";
	const anchorHidden = Boolean(middlewareData.hide?.referenceHidden);
	useIsoLayoutEffect(() => {
		if (lazyFlip && mounted && isPositioned && (renderedSide !== side || lockAlign && renderedAlign !== placementAlign)) setMountPlacement(renderedPlacement);
	}, [
		lazyFlip,
		lockAlign,
		mounted,
		isPositioned,
		renderedPlacement,
		renderedSide,
		renderedAlign,
		side,
		placementAlign
	]);
	const arrowStyles = import_react.useMemo(() => ({
		position: "absolute",
		top: middlewareData.arrow?.y,
		left: middlewareData.arrow?.x
	}), [middlewareData.arrow]);
	const arrowUncentered = middlewareData.arrow?.centerOffset !== 0;
	return import_react.useMemo(() => ({
		positionerStyles: floatingStyles,
		arrowStyles,
		arrowRef,
		arrowUncentered,
		side: logicalRenderedSide,
		align: renderedAlign,
		physicalSide: renderedSide,
		anchorHidden,
		refs,
		context,
		isPositioned,
		update
	}), [
		floatingStyles,
		arrowStyles,
		arrowRef,
		arrowUncentered,
		logicalRenderedSide,
		renderedAlign,
		renderedSide,
		anchorHidden,
		refs,
		context,
		isPositioned,
		update
	]);
}
function isRef(param) {
	return param != null && "current" in param;
}
function getDisabledMountTransitionStyles(transitionStatus) {
	return transitionStatus === "starting" ? DISABLED_TRANSITIONS_STYLE : EMPTY_OBJECT;
}
/**
* Renders the shared outer Positioner element used by popup components.
* Applies the common role, hidden state, transition styles, state attributes, and optional inert styling.
*/
function usePositioner(componentProps, state, { styles, transitionStatus, props, refs, hidden, inert = false }) {
	const style = { ...styles };
	if (inert) style.pointerEvents = "none";
	return useRenderElement("div", componentProps, {
		state,
		ref: refs,
		props: [
			{
				role: "presentation",
				hidden,
				style
			},
			getDisabledMountTransitionStyles(transitionStatus),
			props
		],
		stateAttributesMapping: popupStateMapping
	});
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/TooltipPopup-furysmeyb68uycbz.js
var TooltipRootContext = /*#__PURE__*/ import_react.createContext(void 0);
TooltipRootContext.displayName = "TooltipRootContext";
function useTooltipRootContext(optional) {
	const context = import_react.useContext(TooltipRootContext);
	if (context === void 0 && !optional) throw new Error("Base UI: TooltipRootContext is missing. Tooltip parts must be placed within <Tooltip.Root>.");
	return context;
}
var FloatingDelayGroupContext = /*#__PURE__*/ import_react.createContext({
	hasProvider: false,
	timeoutMs: 0,
	delayRef: { current: 0 },
	initialDelayRef: { current: 0 },
	timeout: new Timeout(),
	currentIdRef: { current: null },
	currentContextRef: { current: null }
});
FloatingDelayGroupContext.displayName = "FloatingDelayGroupContext";
function resetDelayRef(delayRef, initialDelayRef) {
	delayRef.current = initialDelayRef.current;
}
/**
* Experimental next version of `FloatingDelayGroup` to become the default
* in the future. This component is not yet stable.
* Provides context for a group of floating elements that should share a
* `delay`. Unlike `FloatingDelayGroup`, `useDelayGroup` with this
* component does not cause a re-render of unrelated consumers of the
* context when the delay changes.
* @see https://floating-ui.com/docs/FloatingDelayGroup
* @internal
*/
function FloatingDelayGroup(props) {
	const { children, delay, timeoutMs = 0 } = props;
	const delayRef = import_react.useRef(delay);
	const initialDelayRef = import_react.useRef(delay);
	const currentIdRef = import_react.useRef(null);
	const currentContextRef = import_react.useRef(null);
	const timeout = useTimeout();
	useIsoLayoutEffect(() => {
		initialDelayRef.current = delay;
		if (!currentIdRef.current) {
			delayRef.current = delay;
			return;
		}
		delayRef.current = {
			open: getDelay(delayRef.current, "open"),
			close: getDelay(delay, "close")
		};
	}, [
		delay,
		currentIdRef,
		delayRef,
		initialDelayRef
	]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingDelayGroupContext.Provider, {
		value: import_react.useMemo(() => ({
			hasProvider: true,
			delayRef,
			initialDelayRef,
			currentIdRef,
			timeoutMs,
			currentContextRef,
			timeout
		}), [timeoutMs, timeout]),
		children
	});
}
/**
* Enables grouping when called inside a component that's a child of a
* `FloatingDelayGroup`.
* @see https://floating-ui.com/docs/FloatingDelayGroup
* @internal
*/
function useDelayGroup(store, options = { open: false }) {
	const { open } = options;
	const floatingId = store.useState("floatingId");
	const { currentIdRef, delayRef, timeoutMs, initialDelayRef, currentContextRef, hasProvider, timeout } = import_react.useContext(FloatingDelayGroupContext);
	const [isInstantPhase, setIsInstantPhase] = import_react.useState(false);
	const openRef = import_react.useRef(open);
	useIsoLayoutEffect(() => {
		openRef.current = open;
	}, [open]);
	useIsoLayoutEffect(() => {
		function unset() {
			currentContextRef.current?.setIsInstantPhase(false);
			currentIdRef.current = null;
			currentContextRef.current = null;
			delayRef.current = initialDelayRef.current;
			timeout.clear();
		}
		if (!currentIdRef.current) return;
		if (!open && currentIdRef.current === floatingId) {
			setIsInstantPhase(false);
			if (timeoutMs) {
				const closingId = floatingId;
				timeout.start(timeoutMs, () => {
					if (store.select("open") || currentIdRef.current && currentIdRef.current !== closingId) return;
					unset();
				});
				return () => {
					if (openRef.current || currentIdRef.current !== closingId) timeout.clear();
				};
			}
			unset();
		}
	}, [
		open,
		floatingId,
		currentIdRef,
		delayRef,
		timeoutMs,
		initialDelayRef,
		currentContextRef,
		timeout,
		store
	]);
	useIsoLayoutEffect(() => {
		if (!open) return;
		const prevContext = currentContextRef.current;
		const prevId = currentIdRef.current;
		timeout.clear();
		currentContextRef.current = {
			onOpenChange: store.setOpen,
			setIsInstantPhase
		};
		currentIdRef.current = floatingId;
		delayRef.current = {
			open: 0,
			close: getDelay(initialDelayRef.current, "close")
		};
		if (prevId !== null && prevId !== floatingId) {
			setIsInstantPhase(true);
			prevContext?.setIsInstantPhase(true);
			prevContext?.onOpenChange(false, createChangeEventDetails(none));
		} else {
			setIsInstantPhase(false);
			prevContext?.setIsInstantPhase(false);
		}
	}, [
		open,
		floatingId,
		store,
		currentIdRef,
		delayRef,
		initialDelayRef,
		currentContextRef,
		timeout
	]);
	useIsoLayoutEffect(() => {
		return () => {
			if (currentIdRef.current === floatingId) {
				currentContextRef.current = null;
				if (!openRef.current) return;
				currentIdRef.current = null;
				resetDelayRef(delayRef, initialDelayRef);
				timeout.clear();
			}
		};
	}, [
		currentContextRef,
		currentIdRef,
		delayRef,
		floatingId,
		initialDelayRef,
		timeout
	]);
	return import_react.useMemo(() => ({
		activeIdRef: currentIdRef,
		hasProvider,
		delayRef,
		isInstantPhase
	}), [
		currentIdRef,
		hasProvider,
		delayRef,
		isInstantPhase
	]);
}
function createVirtualElement(domElement, data) {
	let offsetX = null;
	let offsetY = null;
	let isAutoUpdateEvent = false;
	return {
		contextElement: domElement || void 0,
		getBoundingClientRect() {
			const domRect = domElement?.getBoundingClientRect() || {
				width: 0,
				height: 0,
				x: 0,
				y: 0
			};
			const isXAxis = data.axis === "x" || data.axis === "both";
			const isYAxis = data.axis === "y" || data.axis === "both";
			const canTrackCursorOnAutoUpdate = ["mouseenter", "mousemove"].includes(data.dataRef.current.openEvent?.type || "") && data.pointerType !== "touch";
			const width = data.axis === "y" ? domRect.width : 0;
			const height = data.axis === "x" ? domRect.height : 0;
			let x = domRect.x;
			let y = domRect.y;
			if (offsetX == null && data.x && isXAxis) offsetX = domRect.x - data.x;
			if (offsetY == null && data.y && isYAxis) offsetY = domRect.y - data.y;
			x -= offsetX || 0;
			y -= offsetY || 0;
			if (!isAutoUpdateEvent || canTrackCursorOnAutoUpdate) {
				x = isXAxis && data.x != null ? data.x : x;
				y = isYAxis && data.y != null ? data.y : y;
			}
			isAutoUpdateEvent = true;
			return {
				width,
				height,
				x,
				y,
				top: y,
				right: x + width,
				bottom: y + height,
				left: x
			};
		}
	};
}
function isMouseBasedEvent(event) {
	return event != null && event.clientX != null;
}
/**
* Positions the floating element relative to a client point (in the viewport),
* such as the mouse position. By default, it follows the mouse cursor.
* @see https://floating-ui.com/docs/useClientPoint
*/
function useClientPoint(store, props = {}) {
	const { enabled = true, axis = "both" } = props;
	const open = store.useState("open");
	const floating = store.useState("floatingElement");
	const domReference = store.useState("domReferenceElement");
	const dataRef = store.context.dataRef;
	const initialRef = import_react.useRef(false);
	const cleanupListenerRef = import_react.useRef(null);
	const [pointerType, setPointerType] = import_react.useState();
	const [reactive, setReactive] = import_react.useState([]);
	const resetReference = useStableCallback((reference) => {
		store.set("positionReference", reference);
	});
	const setReference = useStableCallback((newX, newY, referenceElement) => {
		if (initialRef.current) return;
		if (dataRef.current.openEvent && !isMouseBasedEvent(dataRef.current.openEvent)) return;
		store.set("positionReference", createVirtualElement(referenceElement ?? domReference, {
			x: newX,
			y: newY,
			axis,
			dataRef,
			pointerType
		}));
	});
	const handleReferenceEnterOrMove = useStableCallback((event) => {
		if (!open) setReference(event.clientX, event.clientY, event.currentTarget);
		else if (!cleanupListenerRef.current) {
			setReference(event.clientX, event.clientY, event.currentTarget);
			setReactive([]);
		}
	});
	const openCheck = isMouseLikePointerType(pointerType) ? floating : open;
	import_react.useEffect(() => {
		if (!enabled) {
			resetReference(domReference);
			return;
		}
		if (!openCheck) return;
		function cleanupListener() {
			cleanupListenerRef.current?.();
			cleanupListenerRef.current = null;
		}
		const win = getWindow(floating);
		function handleMouseMove(event) {
			const target = getTarget(event);
			if (!contains(floating, target)) setReference(event.clientX, event.clientY);
			else cleanupListener();
		}
		if (!dataRef.current.openEvent || isMouseBasedEvent(dataRef.current.openEvent)) cleanupListenerRef.current = addEventListener(win, "mousemove", handleMouseMove);
		else resetReference(domReference);
		return cleanupListener;
	}, [
		openCheck,
		enabled,
		floating,
		dataRef,
		domReference,
		store,
		setReference,
		resetReference,
		reactive
	]);
	import_react.useEffect(() => () => {
		store.set("positionReference", null);
	}, [store]);
	import_react.useEffect(() => {
		if (enabled && !floating) initialRef.current = false;
	}, [enabled, floating]);
	import_react.useEffect(() => {
		if (!enabled && open) initialRef.current = true;
	}, [enabled, open]);
	const reference = import_react.useMemo(() => {
		function setPointerTypeRef(event) {
			setPointerType(event.pointerType);
		}
		return {
			onPointerDown: setPointerTypeRef,
			onPointerEnter: setPointerTypeRef,
			onMouseMove: handleReferenceEnterOrMove,
			onMouseEnter: handleReferenceEnterOrMove
		};
	}, [handleReferenceEnterOrMove]);
	return import_react.useMemo(() => enabled ? {
		reference,
		trigger: reference
	} : {}, [enabled, reference]);
}
var selectors = {
	...popupStoreSelectors,
	disabled: (state) => state.disabled,
	instantType: (state) => state.instantType,
	isInstantPhase: (state) => state.isInstantPhase,
	trackCursorAxis: (state) => state.trackCursorAxis,
	disableHoverablePopup: (state) => state.disableHoverablePopup,
	lastOpenChangeReason: (state) => state.openChangeReason,
	closeOnClick: (state) => state.closeOnClick,
	appliedTriggerProps: (state, apply) => apply ? state.activeTriggerProps : void 0,
	closeDelay: (state) => state.closeDelay,
	adaptiveOrigin: (state) => state.adaptiveOrigin
};
/**
* The store view that detached handle-backed triggers read from. Both the real `TooltipStore` and
* the inert fallback store satisfy it, so a trigger can read from whichever store the handle
* currently exposes. Narrowed to the members a trigger actually uses — the trigger-data members plus
* `setOpen`/`cancelPendingOpen` (called directly by the trigger) and `useSyncedValue` — so the
* exposed surface can't bypass the open-change pipeline; on the detached fallback store every one of
* these mutations is a no-op.
*/
var TooltipStore = class extends ReactStore {
	constructor(initialState, floatingId, nested) {
		const triggerElements = new PopupTriggerMap();
		super(createInitialState(initialState, triggerElements, floatingId, nested), createInitialContext(triggerElements), selectors);
	}
	setOpen = (nextOpen, eventDetails) => {
		applyPopupOpenChange(this, nextOpen, eventDetails, { extraState: { openChangeReason: eventDetails.reason } });
	};
	cancelPendingOpen(event) {
		this.state.floatingRootContext.dispatchOpenChange(false, createChangeEventDetails(triggerPress, event));
	}
};
function createInitialState(initialState, triggerElements, floatingId, nested = false) {
	return {
		...createInitialPopupStoreState(triggerElements, floatingId, nested),
		disabled: false,
		instantType: void 0,
		isInstantPhase: false,
		trackCursorAxis: "none",
		disableHoverablePopup: false,
		openChangeReason: null,
		closeOnClick: true,
		closeDelay: 0,
		adaptiveOrigin: void 0,
		...initialState
	};
}
function createInitialContext(triggerElements) {
	return {
		popupRef: /*#__PURE__*/ import_react.createRef(),
		onOpenChange: void 0,
		onOpenChangeComplete: void 0,
		triggerElements
	};
}
/**
* Groups all parts of the tooltip.
* Doesn't render its own HTML element.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
var TooltipRoot = fastComponent(function TooltipRoot(props) {
	const { disabled: disabled$1 = false, defaultOpen = false, open: openProp, disableHoverablePopup = false, trackCursorAxis = "none", actionsRef, onOpenChange, onOpenChangeComplete, handle, triggerId: triggerIdProp, defaultTriggerId: defaultTriggerIdProp = null, children } = props;
	const store = usePopupRootStore((floatingId, nested) => new TooltipStore({
		open: defaultOpen,
		openProp,
		activeTriggerId: defaultTriggerIdProp,
		triggerIdProp
	}, floatingId, nested));
	store.useControlledProp("openProp", openProp);
	store.useControlledProp("triggerIdProp", triggerIdProp);
	store.useContextCallback("onOpenChange", onOpenChange);
	store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
	const openState = store.useState("open");
	const open = !disabled$1 && openState;
	const activeTriggerId = store.useState("activeTriggerId");
	const mounted = store.useState("mounted");
	const payload = store.useState("payload");
	store.useSyncedValues({
		trackCursorAxis,
		disableHoverablePopup,
		disabled: disabled$1
	});
	useImplicitActiveTrigger(store, { closeOnActiveTriggerUnmount: true });
	const { forceUnmount, transitionStatus } = useOpenStateTransitions(open, store);
	const isInstantPhase = store.useState("isInstantPhase");
	const instantType = store.useState("instantType");
	const lastOpenChangeReason = store.useState("lastOpenChangeReason");
	const previousInstantTypeRef = import_react.useRef(null);
	useIsoLayoutEffect(() => {
		if (openState && disabled$1) store.setOpen(false, createChangeEventDetails(disabled));
	}, [
		openState,
		disabled$1,
		store
	]);
	useIsoLayoutEffect(() => {
		if (transitionStatus === "ending" && lastOpenChangeReason === "none" || transitionStatus !== "ending" && isInstantPhase) {
			if (instantType !== "delay") previousInstantTypeRef.current = instantType;
			store.set("instantType", "delay");
		} else if (previousInstantTypeRef.current !== null) {
			store.set("instantType", previousInstantTypeRef.current);
			previousInstantTypeRef.current = null;
		}
	}, [
		transitionStatus,
		isInstantPhase,
		lastOpenChangeReason,
		instantType,
		store
	]);
	useIsoLayoutEffect(() => {
		if (open) {
			if (activeTriggerId == null) store.set("payload", void 0);
		}
	}, [
		store,
		activeTriggerId,
		open
	]);
	import_react.useImperativeHandle(actionsRef, () => ({
		unmount: forceUnmount,
		close: () => store.setOpen(false, createChangeEventDetails(imperativeAction))
	}), [forceUnmount, store]);
	const shouldRenderInteractions = open || mounted || !disabled$1 && trackCursorAxis !== "none";
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(TooltipRootContext.Provider, {
		value: store,
		children: [
			handle && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PopupHandleAttachment, {
				handle,
				store
			}),
			shouldRenderInteractions && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TooltipInteractions, {
				store,
				disabled: disabled$1,
				trackCursorAxis
			}),
			typeof children === "function" ? children({ payload }) : children
		]
	});
});
TooltipRoot.displayName = "TooltipRoot";
function TooltipInteractions({ store, disabled, trackCursorAxis }) {
	const floatingRootContext = store.useState("floatingRootContext");
	const dismiss = useDismiss(floatingRootContext, {
		enabled: !disabled,
		referencePress: () => store.select("closeOnClick")
	});
	const clientPoint = useClientPoint(floatingRootContext, {
		enabled: !disabled && trackCursorAxis !== "none",
		axis: trackCursorAxis === "none" ? void 0 : trackCursorAxis
	});
	const triggerProps = import_react.useMemo(() => mergeProps(clientPoint.reference, dismiss.reference), [clientPoint.reference, dismiss.reference]);
	usePopupInteractionProps(store, {
		activeTriggerProps: triggerProps,
		inactiveTriggerProps: triggerProps,
		popupProps: dismiss.floating ?? EMPTY_OBJECT
	});
	return null;
}
/**
* Holds the provider's `delay` value. `closeDelay` is handled by the delay group.
*/
var TooltipProviderContext = /*#__PURE__*/ import_react.createContext(void 0);
TooltipProviderContext.displayName = "TooltipProviderContext";
function useTooltipProviderContext() {
	return import_react.useContext(TooltipProviderContext);
}
var TOOLTIP_TRIGGER_IDENTIFIER = "data-base-ui-tooltip-trigger";
function getTargetElement(event) {
	const target = getTarget(event);
	return isElement(target) ? target : null;
}
/**
* An element to attach the tooltip to.
* Renders a `<button>` element.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
var TooltipTrigger = fastComponentRef(function TooltipTrigger(componentProps, forwardedRef) {
	const { render, className, style, handle, payload, disabled: disabledProp, delay, closeOnClick = true, closeDelay, id: idProp, ...elementProps } = componentProps;
	const rootContext = useTooltipRootContext(true);
	const store = usePopupHandleStore(handle) ?? rootContext;
	if (!store) throw new Error("Base UI: <Tooltip.Trigger> must be either used within a <Tooltip.Root> component or provided with a handle.");
	const thisTriggerId = useBaseUiId(idProp);
	const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
	const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
	const floatingRootContext = store.useState("floatingRootContext");
	const triggerElementRef = import_react.useRef(null);
	const closeDelayWithDefault = closeDelay ?? 0;
	const { registerTrigger, isMountedByThisTrigger } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
		payload,
		closeOnClick,
		closeDelay: closeDelayWithDefault
	});
	const providerDelay = useTooltipProviderContext();
	const { activeIdRef, delayRef, isInstantPhase, hasProvider } = useDelayGroup(floatingRootContext, { open: isOpenedByThisTrigger });
	const hoverInteraction = useHoverInteractionSharedState(floatingRootContext);
	store.useSyncedValue("isInstantPhase", isInstantPhase);
	const rootDisabled = store.useState("disabled");
	const disabled = disabledProp ?? rootDisabled;
	const disabledRef = useValueAsRef(disabled);
	const trackCursorAxis = store.useState("trackCursorAxis");
	const disableHoverablePopup = store.useState("disableHoverablePopup");
	const isNestedTriggerHoveredRef = import_react.useRef(false);
	const nestedTriggerOpenTimeout = useTimeout();
	const pointerTypeRef = import_react.useRef(void 0);
	function getOpenDelay() {
		if (hasProvider && activeIdRef.current != null) return 0;
		return delay ?? providerDelay ?? 600;
	}
	function isEnabledNestedTriggerTarget(target) {
		const triggerEl = triggerElementRef.current;
		if (!triggerEl || !target) return false;
		const nearestTrigger = closest(target, `[${TOOLTIP_TRIGGER_IDENTIFIER}]`);
		return nearestTrigger !== null && nearestTrigger !== triggerEl && contains(triggerEl, nearestTrigger);
	}
	function detectNestedTriggerHover(target) {
		const nestedTriggerHovered = isEnabledNestedTriggerTarget(target);
		isNestedTriggerHoveredRef.current = nestedTriggerHovered;
		if (nestedTriggerHovered) {
			hoverInteraction.openChangeTimeout.clear();
			hoverInteraction.restTimeout.clear();
			hoverInteraction.restTimeoutPending = false;
			nestedTriggerOpenTimeout.clear();
		}
		return nestedTriggerHovered;
	}
	const hoverProps = useHoverReferenceInteraction(floatingRootContext, {
		enabled: !disabled,
		mouseOnly: true,
		move: false,
		handleClose: !disableHoverablePopup && trackCursorAxis !== "both" ? safePolygon() : null,
		restMs: getOpenDelay,
		delay() {
			if (closeDelay == null && hasProvider) return { close: getDelay(delayRef.current, "close") };
			return { close: closeDelayWithDefault };
		},
		triggerElementRef,
		isActiveTrigger: isTriggerActive,
		isClosing: () => store.select("transitionStatus") === "ending",
		shouldOpen() {
			return !isNestedTriggerHoveredRef.current;
		}
	});
	const focusProps = useFocus(floatingRootContext, { enabled: !disabled }).reference;
	const handleNestedTriggerHover = (event) => {
		const wasNestedTriggerHovered = isNestedTriggerHoveredRef.current;
		const target = getTargetElement(event);
		const nestedTriggerHovered = detectNestedTriggerHover(target);
		const triggerEl = triggerElementRef.current;
		const targetInsideTrigger = triggerEl && target && contains(triggerEl, target);
		if (nestedTriggerHovered && store.select("open") && store.select("lastOpenChangeReason") === "trigger-hover") {
			store.setOpen(false, createChangeEventDetails(triggerHover, event));
			return;
		}
		if (wasNestedTriggerHovered && !nestedTriggerHovered && targetInsideTrigger && !disabledRef.current && !store.select("open") && triggerEl && isMouseLikePointerType(pointerTypeRef.current)) {
			const open = () => {
				if (!isNestedTriggerHoveredRef.current && !disabledRef.current && !store.select("open")) store.setOpen(true, createChangeEventDetails(triggerHover, event, triggerEl));
			};
			const openDelay = getOpenDelay();
			if (openDelay === 0) {
				nestedTriggerOpenTimeout.clear();
				open();
			} else nestedTriggerOpenTimeout.start(openDelay, open);
		}
	};
	const rootTriggerProps = store.useState("appliedTriggerProps", isMountedByThisTrigger || trackCursorAxis !== "none");
	return useRenderElement("button", componentProps, {
		state: { open: isOpenedByThisTrigger },
		ref: [
			forwardedRef,
			registerTrigger,
			triggerElementRef
		],
		props: [
			hoverProps,
			focusProps,
			rootTriggerProps,
			{
				onMouseOver(event) {
					handleNestedTriggerHover(event.nativeEvent);
				},
				onFocus(event) {
					if (isEnabledNestedTriggerTarget(getTargetElement(event.nativeEvent))) event.preventBaseUIHandler();
				},
				onMouseLeave() {
					isNestedTriggerHoveredRef.current = false;
					nestedTriggerOpenTimeout.clear();
					pointerTypeRef.current = void 0;
				},
				onPointerEnter(event) {
					pointerTypeRef.current = event.pointerType;
				},
				onPointerDown(event) {
					pointerTypeRef.current = event.pointerType;
					store.set("closeOnClick", closeOnClick);
					if (closeOnClick && !store.select("open")) store.cancelPendingOpen(event.nativeEvent);
				},
				onClick(event) {
					if (closeOnClick && !store.select("open")) store.cancelPendingOpen(event.nativeEvent);
				},
				id: thisTriggerId,
				[triggerDisabled]: disabled ? "" : void 0,
				[TOOLTIP_TRIGGER_IDENTIFIER]: disabled ? void 0 : ""
			},
			elementProps
		],
		stateAttributesMapping: triggerOpenStateMapping
	});
});
TooltipTrigger.displayName = "TooltipTrigger";
var TooltipPortalContext = /*#__PURE__*/ import_react.createContext(void 0);
TooltipPortalContext.displayName = "TooltipPortalContext";
function useTooltipPortalContext() {
	const value = import_react.useContext(TooltipPortalContext);
	if (value === void 0) throw new Error("Base UI: <Tooltip.Portal> is missing.");
	return value;
}
/**
* A portal element that moves the popup to a different part of the DOM.
* By default, the portal element is appended to `<body>`.
* Renders a `<div>` element.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
var TooltipPortal = /*#__PURE__*/ import_react.forwardRef(function TooltipPortal(props, forwardedRef) {
	const { keepMounted = false, ...portalProps } = props;
	if (!(useTooltipRootContext().useState("mounted") || keepMounted)) return null;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TooltipPortalContext.Provider, {
		value: keepMounted,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingPortalLite, {
			ref: forwardedRef,
			...portalProps
		})
	});
});
TooltipPortal.displayName = "TooltipPortal";
var TooltipPositionerContext = /*#__PURE__*/ import_react.createContext(void 0);
TooltipPositionerContext.displayName = "TooltipPositionerContext";
function useTooltipPositionerContext() {
	const context = import_react.useContext(TooltipPositionerContext);
	if (context === void 0) throw new Error("Base UI: TooltipPositionerContext is missing. TooltipPositioner parts must be placed within <Tooltip.Positioner>.");
	return context;
}
/**
* Positions the tooltip against the trigger.
* Renders a `<div>` element.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
var TooltipPositioner = /*#__PURE__*/ import_react.forwardRef(function TooltipPositioner(componentProps, forwardedRef) {
	const { render, className, anchor, positionMethod = "absolute", side = "top", align = "center", sideOffset = 0, alignOffset = 0, collisionBoundary = "clipping-ancestors", collisionPadding = 5, arrowPadding = 5, sticky = false, disableAnchorTracking = false, collisionAvoidance = POPUP_COLLISION_AVOIDANCE, style, ...elementProps } = componentProps;
	const store = useTooltipRootContext();
	const keepMounted = useTooltipPortalContext();
	const open = store.useState("open");
	const mounted = store.useState("mounted");
	const trackCursorAxis = store.useState("trackCursorAxis");
	const disableHoverablePopup = store.useState("disableHoverablePopup");
	const floatingRootContext = store.useState("floatingRootContext");
	const instantType = store.useState("instantType");
	const transitionStatus = store.useState("transitionStatus");
	const positioning = useAnchorPositioning({
		anchor,
		positionMethod,
		floatingRootContext,
		mounted,
		side,
		sideOffset,
		align,
		alignOffset,
		collisionBoundary,
		collisionPadding,
		sticky,
		arrowPadding,
		disableAnchorTracking,
		keepMounted,
		collisionAvoidance,
		adaptiveOrigin: store.useState("adaptiveOrigin")
	});
	const element = usePositioner(componentProps, import_react.useMemo(() => ({
		open,
		side: positioning.side,
		align: positioning.align,
		anchorHidden: positioning.anchorHidden,
		instant: trackCursorAxis !== "none" ? "tracking-cursor" : instantType
	}), [
		open,
		positioning.side,
		positioning.align,
		positioning.anchorHidden,
		trackCursorAxis,
		instantType
	]), {
		styles: positioning.positionerStyles,
		transitionStatus,
		props: elementProps,
		refs: [forwardedRef, store.useStateSetter("positionerElement")],
		hidden: !mounted,
		inert: !open || trackCursorAxis === "both" || disableHoverablePopup
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TooltipPositionerContext.Provider, {
		value: positioning,
		children: element
	});
});
TooltipPositioner.displayName = "TooltipPositioner";
/**
* A container for the tooltip contents.
* Renders a `<div>` element.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
var TooltipPopup = /*#__PURE__*/ import_react.forwardRef(function TooltipPopup(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const store = useTooltipRootContext();
	const { side, align } = useTooltipPositionerContext();
	const open = store.useState("open");
	const instantType = store.useState("instantType");
	const transitionStatus = store.useState("transitionStatus");
	const popupProps = store.useState("popupProps");
	const floatingContext = store.useState("floatingRootContext");
	const disabled = store.useState("disabled");
	const closeDelay = store.useState("closeDelay");
	useOpenChangeComplete({
		open,
		ref: store.context.popupRef,
		onComplete() {
			if (open) store.context.onOpenChangeComplete?.(true);
		}
	});
	useHoverFloatingInteraction(floatingContext, {
		enabled: !disabled,
		closeDelay
	});
	const setPopupElement = store.useStateSetter("popupElement");
	return useRenderElement("div", componentProps, {
		state: {
			open,
			side,
			align,
			instant: instantType,
			transitionStatus
		},
		ref: [
			forwardedRef,
			store.context.popupRef,
			setPopupElement
		],
		props: [
			FOCUSABLE_POPUP_PROPS,
			popupProps,
			getDisabledMountTransitionStyles(transitionStatus),
			elementProps
		],
		stateAttributesMapping: popupTransitionStateMapping
	});
});
TooltipPopup.displayName = "TooltipPopup";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/TooltipProvider-hyans0ens4axh1y8.js
/**
* Displays an element positioned against the tooltip anchor.
* Renders a `<div>` element.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
var TooltipArrow = /*#__PURE__*/ import_react.forwardRef(function TooltipArrow(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const store = useTooltipRootContext();
	const { arrowRef, side, align, arrowUncentered, arrowStyles } = useTooltipPositionerContext();
	return useRenderElement("div", componentProps, {
		state: {
			open: store.useState("open"),
			side,
			align,
			uncentered: arrowUncentered,
			instant: store.useState("instantType")
		},
		ref: [forwardedRef, arrowRef],
		props: [{
			style: arrowStyles,
			"aria-hidden": true
		}, elementProps],
		stateAttributesMapping: popupStateMapping
	});
});
TooltipArrow.displayName = "TooltipArrow";
/**
* Provides a shared delay for multiple tooltips. The grouping logic ensures that
* once a tooltip becomes visible, the adjacent tooltips will be shown instantly.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
var TooltipProvider = function TooltipProvider(props) {
	const { delay, closeDelay, timeout = 400 } = props;
	const delayValue = import_react.useMemo(() => ({
		open: delay,
		close: closeDelay
	}), [delay, closeDelay]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TooltipProviderContext.Provider, {
		value: delay,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingDelayGroup, {
			delay: delayValue,
			timeoutMs: timeout,
			children: props.children
		})
	});
};
TooltipProvider.displayName = "TooltipProvider";
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/tooltip-bcymn9bfyz29fvji.js
/**
* Accessible popup that shows additional information on hover/focus.
* Wrap your app or section with `<TooltipProvider>` to enable delay grouping.
*
* @example
* ```tsx
* <Tooltip content="Save changes" render={<Button variant="primary" />}>
*   Save
* </Tooltip>
* ```
*/
function Tooltip({ content, children, align, asChild, render, side, className, container: containerProp, closeDelay, delay, ...props }) {
	const contextContainer = usePortalContainer();
	const container = containerProp ?? contextContainer ?? void 0;
	const resolvedRender = render ?? (asChild ? children : void 0);
	const shouldUseRender = resolvedRender !== void 0;
	const triggerTabIndex = !shouldUseRender && props.disabled ? -1 : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipRoot, {
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
			closeDelay,
			delay,
			className: cn(!shouldUseRender && "m-0 inline-flex h-auto min-h-0 items-center border-none bg-transparent p-0 shadow-none", "cursor-default", className),
			render: resolvedRender,
			tabIndex: triggerTabIndex,
			children: asChild ? void 0 : children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipPortal, {
			container,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipPositioner, {
				align,
				side,
				sideOffset: 10,
				className: "max-w-[var(--available-width)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipPopup, {
					className: cn("flex origin-[var(--transform-origin)] flex-col rounded-md bg-kumo-base px-2.5 py-1.5 text-sm text-kumo-default", "shadow-md outline outline-kumo-line", "transition-[transform,scale,opacity] duration-150", "data-[starting-style]:scale-90 data-[starting-style]:opacity-0", "data-[ending-style]:scale-90 data-[ending-style]:opacity-0", "data-[instant]:duration-0", "kumo-tooltip-popup"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipArrow, {
						className: cn("flex", "data-[side=bottom]:top-[-8px]", "data-[side=left]:right-[-13px] data-[side=left]:rotate-90", "data-[side=right]:left-[-13px] data-[side=right]:-rotate-90", "data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowSvg, {})
					}), content]
				})
			})
		})]
	});
}
/**
* Arrow SVG with three paths for proper border rendering in both light and dark modes.
* This approach matches Base UI's tooltip implementation.
*
* The three paths are:
* 1. ArrowFill - The main arrow body, matches tooltip background
* 2. ArrowOuterStroke - Border visible in light mode only (transparent in dark)
* 3. ArrowInnerStroke - Border visible in dark mode only (transparent in light)
*
* This is necessary because the outer and inner stroke paths have different geometries,
* and using both ensures the arrow border aligns perfectly with the tooltip's outline
* in both color modes.
*
* @see https://base-ui.com/react/components/tooltip
*/
function ArrowSvg(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "20",
		height: "10",
		viewBox: "0 0 20 10",
		fill: "none",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z",
				className: "fill-kumo-base"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z",
				className: "fill-kumo-arrow-edge"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z",
				className: "fill-kumo-arrow-stroke"
			})
		]
	});
}
//#endregion
//#region node_modules/.pnpm/@cloudflare+kumo@2.19.0_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._b3e12a49b28b5c0989915f47975c79fa/node_modules/@cloudflare/kumo/dist/chunks/button-hzvowfkbathmx8yg.js
/** Button variant definitions mapping shape, size, and variant names to their Tailwind classes. */
var KUMO_BUTTON_VARIANTS = {
	shape: {
		base: {
			classes: "",
			description: "Default rectangular button shape"
		},
		square: {
			classes: "items-center justify-center p-0",
			description: "Square button for icon-only actions"
		},
		circle: {
			classes: "items-center justify-center p-0 rounded-full",
			description: "Circular button for icon-only actions"
		}
	},
	size: {
		xs: {
			classes: "h-5 gap-1 rounded-sm px-1.5 text-xs",
			description: "Extra small button for compact UIs"
		},
		sm: {
			classes: "h-6.5 gap-1 rounded-md px-2 text-xs",
			description: "Small button for secondary actions"
		},
		base: {
			classes: "h-9 gap-1.5 rounded-lg px-3 text-base leading-5",
			description: "Default button size"
		},
		lg: {
			classes: "h-10 gap-2 rounded-lg px-4 text-base leading-5",
			description: "Large button for primary CTAs"
		}
	},
	compactSize: {
		xs: { classes: "size-3.5" },
		sm: { classes: "size-6.5" },
		base: { classes: "size-9" },
		lg: { classes: "size-10" }
	},
	variant: {
		primary: {
			classes: "relative overflow-hidden bg-(--kumo-button-emphasis-bg) !text-white ring ring-(--kumo-button-emphasis-ring) focus:ring-(--kumo-button-emphasis-ring) focus-visible:ring-(--kumo-button-emphasis-ring) active:ring-(--kumo-button-emphasis-ring) disabled:opacity-50",
			description: "High-emphasis button for primary actions"
		},
		secondary: {
			classes: "bg-kumo-base !text-kumo-default ring not-disabled:hover:bg-kumo-tint disabled:bg-kumo-base/50 disabled:!text-kumo-default/70 ring-kumo-line data-[state=open]:bg-kumo-base",
			description: "Default button style for most actions"
		},
		ghost: {
			classes: "text-kumo-default hover:bg-kumo-tint shadow-none",
			description: "Minimal button with no background"
		},
		destructive: {
			classes: "relative overflow-hidden bg-(--kumo-button-emphasis-bg) !text-white ring ring-(--kumo-button-emphasis-ring) focus:ring-(--kumo-button-emphasis-ring) focus-visible:ring-(--kumo-button-emphasis-ring) active:ring-(--kumo-button-emphasis-ring) disabled:opacity-50",
			description: "Danger button for destructive actions like delete"
		},
		"secondary-destructive": {
			classes: "bg-kumo-base !text-kumo-danger ring not-disabled:hover:!text-kumo-danger not-disabled:hover:ring-kumo-danger/30 disabled:bg-kumo-base/50 disabled:!text-kumo-danger/70 ring-kumo-line data-[state=open]:bg-kumo-base",
			description: "Secondary button with destructive text for less prominent dangerous actions"
		},
		outline: {
			classes: "bg-transparent text-kumo-default ring ring-kumo-line transition-colors not-disabled:hover:text-kumo-strong not-disabled:hover:ring-kumo-focus/25",
			description: "Bordered button with transparent background"
		}
	}
};
var KUMO_BUTTON_DEFAULT_VARIANTS = {
	shape: "base",
	size: "base",
	variant: "secondary"
};
function buttonVariants({ variant = KUMO_BUTTON_DEFAULT_VARIANTS.variant, size = KUMO_BUTTON_DEFAULT_VARIANTS.size, shape = KUMO_BUTTON_DEFAULT_VARIANTS.shape } = {}) {
	const isCompactShape = shape === "square" || shape === "circle";
	return cn("group flex w-max shrink-0 items-center font-medium select-none", "border-0 shadow-xs", "focus:ring-kumo-focus/50 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-kumo-brand", "cursor-pointer", "disabled:cursor-not-allowed disabled:text-kumo-subtle", resolveVariant(KUMO_BUTTON_VARIANTS.size, size, KUMO_BUTTON_DEFAULT_VARIANTS.size).classes, resolveVariant(KUMO_BUTTON_VARIANTS.shape, shape, KUMO_BUTTON_DEFAULT_VARIANTS.shape).classes, isCompactShape && resolveVariant(KUMO_BUTTON_VARIANTS.compactSize, size, KUMO_BUTTON_DEFAULT_VARIANTS.size).classes, resolveVariant(KUMO_BUTTON_VARIANTS.variant, variant, KUMO_BUTTON_DEFAULT_VARIANTS.variant).classes);
}
var ICON_LEADING_PADDING = {
	xs: "pl-1",
	sm: "pl-1.5",
	base: "pl-2.5",
	lg: "pl-3.5"
};
var getIconPaddingClasses = (shape, size, iconNode, children) => {
	const hasText = import_react.Children.toArray(children).some((child) => child !== "");
	if (shape !== "base" || !hasText || iconNode == null) return void 0;
	return ICON_LEADING_PADDING[size];
};
var renderIconNode = (iconProp) => {
	const IconComponent = unwrapLazyElement(iconProp);
	if (!IconComponent) return null;
	if (import_react.isValidElement(IconComponent)) return IconComponent;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComponent, {});
};
var getEmphasisToken = (variant) => {
	if (variant === "primary") return "var(--color-kumo-brand)";
	if (variant === "destructive") return "var(--color-kumo-danger)";
};
var getEmphasisStyle = (variant) => {
	const token = getEmphasisToken(variant);
	if (!token) return void 0;
	return {
		"--kumo-button-emphasis-ring": `color-mix(in oklch, ${token}, black 10%)`,
		"--kumo-button-emphasis-bg": `color-mix(in oklch, ${token}, white 30%)`,
		"--kumo-button-emphasis-gradient-start": `color-mix(in oklch, ${token}, white 15%)`,
		"--kumo-button-emphasis-gradient-end": token
	};
};
var ANCHOR_ONLY_PROPS = /* @__PURE__ */ new Set([
	"href",
	"target",
	"rel",
	"download",
	"hrefLang",
	"media",
	"ping",
	"referrerPolicy",
	"linksExternal"
]);
var toDisabledButtonProps = (props) => {
	const result = { ...props };
	for (const key of Object.keys(result)) if (key.startsWith("on") || ANCHOR_ONLY_PROPS.has(key)) delete result[key];
	return result;
};
var renderButtonContent = (variant, iconNode, children) => {
	const childNode = children != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "contents",
		children
	}) : null;
	if (!getEmphasisToken(variant)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [iconNode, childNode] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": "true",
		className: "absolute inset-0 rounded-[inherit] bg-linear-to-b from-(--kumo-button-emphasis-gradient-start) to-(--kumo-button-emphasis-gradient-end) shadow-[inset_0_1px_0_0_var(--kumo-button-emphasis-bg)] group-hover:from-(--kumo-button-emphasis-bg)"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "relative flex items-center gap-1.5",
		children: [iconNode, childNode]
	})] });
};
var getTitleLabel = (title) => {
	if (typeof title === "string") return title;
	if (typeof title === "number") return String(title);
};
/**
* Primary action trigger. Supports multiple variants, sizes, shapes, icons, and loading state.
*
* @example
* ```tsx
* <Button variant="primary">Save</Button>
* <Button variant="secondary" icon={PlusIcon}>Create Worker</Button>
* ```
*/
var Button = import_react.forwardRef(({ children, className, disabled, loading, shape = "base", size = "base", variant = "secondary", icon: IconComponent, style, title, ...props }, ref) => {
	const { type, ...restProps } = props;
	const emphasisStyle = getEmphasisStyle(variant);
	const titleLabel = getTitleLabel(title);
	const buttonProps = {
		...restProps,
		...!import_react.Children.count(children) && !restProps["aria-label"] && !restProps["aria-labelledby"] && titleLabel && { "aria-label": titleLabel }
	};
	const iconNode = loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { size: size === "lg" ? 16 : 14 }) : renderIconNode(IconComponent);
	const button = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		ref,
		"data-kumo-component": "Button",
		className: cn(buttonVariants({
			variant,
			size,
			shape
		}), getIconPaddingClasses(shape, size, iconNode, children), disabled && "cursor-not-allowed opacity-50", className),
		disabled: loading || disabled,
		style: emphasisStyle ? {
			...emphasisStyle,
			...style
		} : style,
		type: type ?? "button",
		...buttonProps,
		children: renderButtonContent(variant, iconNode, children)
	});
	if (title && (disabled || loading)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		content: title,
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex" }),
		children: button
	});
	if (title) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		content: title,
		render: button
	});
	return button;
});
Button.displayName = "Button";
/**
* Anchor element styled as a button. Integrates with `LinkProvider` for framework routing.
*
* @example
* ```tsx
* <LinkButton href="/settings" variant="ghost">Settings</LinkButton>
* ```
*/
var LinkButton = import_react.forwardRef(({ children, className, disabled = false, external, href, shape = "base", size = "base", variant = "ghost", icon: IconComponent, style, title, ...props }, ref) => {
	const LinkComponent = useLinkComponent();
	const emphasisStyle = getEmphasisStyle(variant);
	const externalProps = external ? {
		target: "_blank",
		rel: "noopener noreferrer"
	} : {};
	if (disabled) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		...toDisabledButtonProps(props),
		className: cn("select-text", className),
		"data-kumo-component": "LinkButton",
		disabled: true,
		icon: IconComponent,
		shape,
		size,
		style,
		title,
		variant,
		children
	});
	const iconNode = renderIconNode(IconComponent);
	const link = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkComponent, {
		ref,
		"data-kumo-component": "LinkButton",
		className: cn(buttonVariants({
			variant,
			size,
			shape
		}), getIconPaddingClasses(shape, size, iconNode, children), "flex items-center no-underline! select-text", className),
		href,
		style: emphasisStyle ? {
			...emphasisStyle,
			...style
		} : style,
		to: typeof href === "string" ? href : void 0,
		...externalProps,
		...props,
		children: renderButtonContent(variant, iconNode, children)
	});
	if (title) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		content: title,
		render: link
	});
	return link;
});
LinkButton.displayName = "LinkButton";
//#endregion
export { addEventListener as $, rectToClientRect as $t, AnimationFrame as A, isMouseLikePointerType as At, PopupTriggerMap as B, popupTransitionStateMapping as Bt, usePopupRootStore as C, getNextTabbable as Ct, useTransitionStatus as D, isElementVisible as Dt, useUnmountAfterClose as E, ios as Et, CLICK_TRIGGER_IDENTIFIER as F, isVirtualClick as Ft, usePortalContext as G, triggerOpenStateMapping as Gt, createAttribute as H, stopEvent as Ht, DROPDOWN_COLLISION_AVOIDANCE as I, isVirtualPointerEvent as It, useId$1 as J, isElement as Jt, useFloatingParentNodeId as K, getNodeName as Kt, FloatingPortal as L, jsdom as Lt, useValueAsRef as M, isTabbable as Mt, Timeout as N, isTypeableCombobox as Nt, resolveRef as O, isIndexOutOfListBounds as Ot, useTimeout as P, isTypeableElement as Pt, mergeCleanups as Q, platform$1 as Qt, FloatingRootStore as R, ownerDocument as Rt, usePopupInteractionProps as S, getNextListIndex as St, useTriggerDataForwarding as T, getTarget as Tt, fastComponent as U, tabbable as Ut, ReactStore as V, pressableTriggerOpenStateMapping as Vt, fastComponentRef as W, transitionStatusMapping as Wt, visuallyHiddenInput as X, isOverflowElement as Xt, visuallyHidden as Y, isHTMLElement as Yt, useStableCallback as Z, isShadowRoot as Zt, getNodeAncestors as _, contains as _t, useAnchorPositioning as a, NOOP as an, listNavigation as at, useImplicitActiveTrigger as b, getMaxListIndex as bt, useBaseUiId as c, makeEventPreventable as cn, windowResize as ct, popupStoreSelectors as d, useRefWithInit as dn, ARROW_DOWN as dt, SafeReact as en, cancelOpen as et, FOCUSABLE_POPUP_PROPS as f, useRenderElement as fn, ARROW_LEFT as ft, createPopupOpenState as g, closest as gt, createDefaultInitialFocus as h, cn as hn, activeElement as ht, getDisabledMountTransitionStyles as i, EMPTY_OBJECT as in, itemPress as it, useAnimationFrame as j, isOutsideEvent as jt, useOpenChangeComplete as k, isListIndexDisabled as kt, usePopupHandleStore as l, mergeProps as ln, createChangeEventDetails as lt, attachPreventUnmountOnClose as m, resolveVariant as mn, ARROW_UP as mt, buttonVariants as n, usePortalContainer as nn, focusOut as nt, usePositioner as o, createLogOnce as on, none as ot, PopupHandleAttachment as p, unwrapLazyElement as pn, ARROW_RIGHT as pt, useFloatingTree as q, getWindow as qt, Tooltip as r, EMPTY_ARRAY as rn, imperativeAction as rt, useDirection as s, isReactVersionAtLeast as sn, triggerPress as st, Button as t, useIsoLayoutEffect as tn, closePress as tt, createInitialPopupStoreState as u, useMergedRefs as un, webkit as ut, getNodeChildren as v, focusable as vt, usePopupRootSync as w, getPreviousTabbable as wt, useOpenStateTransitions as x, getMinListIndex as xt, useDismiss as y, getFloatingFocusElement as yt, FocusGuard as z, popupStateMapping as zt };

//# sourceMappingURL=button-hzvowfkbathmx8yg-Ddqo88Fb.js.map