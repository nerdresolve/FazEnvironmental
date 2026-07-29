var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import React3, { Component, createContext, useState, useRef, useCallback, useMemo, useEffect, useContext } from "react";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { useLocation, NavLink, Link, Routes, Route } from "react-router-dom";
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React3.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React3.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  constructor(context, canUseDOM) {
    __publicField(this, "instances", []);
    __publicField(this, "canUseDOM", isDocument);
    __publicField(this, "context");
    __publicField(this, "value", {
      setHelmet: (serverState) => {
        this.context.helmet = serverState;
      },
      helmetInstances: {
        get: () => this.canUseDOM ? instances : this.instances,
        add: (instance) => {
          (this.canUseDOM ? instances : this.instances).push(instance);
        },
        remove: (instance) => {
          const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
          (this.canUseDOM ? instances : this.instances).splice(index, 1);
        }
      }
    });
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React3.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React3.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
}, __publicField(_a, "canUseDOM", isDocument), _a);
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => {
    var _a2;
    return (_a2 = tag.parentNode) == null ? void 0 : _a2.removeChild(tag);
  });
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "rendered", false);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = (_b = class extends Component {
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React3.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React3.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React3.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React3.createElement(HelmetDispatcher, { ...newProps, context }));
  }
}, __publicField(_b, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _b);
const ContactContext = createContext(null);
function useContactForm() {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    throw new Error("useContactForm must be used within ContactProvider");
  }
  return ctx;
}
const WHATSAPP_NUMBER = "5521972228908";
function ContactProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("site");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const openContactForm = useCallback((nextSource) => {
    previouslyFocusedRef.current = document.activeElement;
    setSource(nextSource);
    setStatus("idle");
    setErrorMessage("");
    setIsOpen(true);
  }, []);
  const contextValue = useMemo(() => ({ openContactForm }), [openContactForm]);
  const close = useCallback(() => {
    var _a2;
    setIsOpen(false);
    (_a2 = previouslyFocusedRef.current) == null ? void 0 : _a2.focus();
  }, []);
  useEffect(() => {
    var _a2;
    if (!isOpen) return;
    (_a2 = closeButtonRef.current) == null ? void 0 : _a2.focus();
    function onKeyDown(event) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      company: String(formData.get("company") ?? ""),
      message: String(formData.get("message") ?? ""),
      source
    };
    setStatus("submitting");
    setErrorMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Não foi possível enviar sua mensagem.");
      }
      setStatus("success");
      form.reset();
      const whatsappMessage = `Olá! Meu nome é ${payload.name} e acabei de enviar uma mensagem pelo site da FAZ.`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Não foi possível enviar sua mensagem.");
    }
  }
  return /* @__PURE__ */ jsxs(ContactContext.Provider, { value: contextValue, children: [
    children,
    isOpen && /* @__PURE__ */ jsx("div", { className: "modal-overlay", onClick: close, children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: "modal-card",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "contact-modal-title",
        onClick: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ jsx("button", { ref: closeButtonRef, className: "modal-close", onClick: close, "aria-label": "Fechar", children: "×" }),
          /* @__PURE__ */ jsx("h2", { id: "contact-modal-title", children: "Fale com um consultor" }),
          /* @__PURE__ */ jsx("p", { children: "Conte um pouco sobre sua operação e retornaremos o mais breve possível." }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
            /* @__PURE__ */ jsxs("div", { className: "form-field", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "name", children: "Nome" }),
              /* @__PURE__ */ jsx("input", { id: "name", name: "name", type: "text", autoComplete: "name", required: true })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-field", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "E-mail" }),
              /* @__PURE__ */ jsx("input", { id: "email", name: "email", type: "email", autoComplete: "email", required: true })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-field", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "phone", children: "Telefone" }),
              /* @__PURE__ */ jsx("input", { id: "phone", name: "phone", type: "tel", autoComplete: "tel" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-field", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "company", children: "Empresa" }),
              /* @__PURE__ */ jsx("input", { id: "company", name: "company", type: "text", autoComplete: "organization" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-field", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "message", children: "Mensagem" }),
              /* @__PURE__ */ jsx("textarea", { id: "message", name: "message", rows: 4, required: true })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary btn-block", disabled: status === "submitting", children: status === "submitting" ? "Enviando..." : "Enviar mensagem" }),
            status === "success" && /* @__PURE__ */ jsx("p", { className: "form-status success", role: "status", children: "Mensagem enviada com sucesso! Abrimos o WhatsApp para você falar com a gente agora mesmo." }),
            status === "error" && /* @__PURE__ */ jsx("p", { className: "form-status error", role: "alert", children: errorMessage })
          ] })
        ]
      }
    ) })
  ] });
}
function ContactCtaButton({ source, className, children }) {
  const { openContactForm } = useContactForm();
  return /* @__PURE__ */ jsx("button", { type: "button", className, onClick: () => openContactForm(source), children });
}
const CONTACT_SOURCES = {
  header: "header",
  footer: "footer",
  hero: "hero",
  heroStrip: "hero-strip",
  ctaBanner: "cta-banner",
  nextStep: "next-step",
  nextStepSecondary: "next-step-secondary",
  metodoFaz: "metodo-faz",
  sobre: "sobre"
};
function serviceSource(title) {
  return `servico:${title}`;
}
const logo$1 = "/assets/logo-full-DkYEk6s1.png";
const logoWebp$1 = "/assets/logo-full-CFI7dK6k.webp";
const navLinks = [
  { to: "/solucoes", label: "Soluções" },
  { to: "/metodo-faz", label: "Método FAZ" },
  { to: "/sobre", label: "Sobre" }
];
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("header", { className: "site-header", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx(NavLink, { to: "/", className: "brand", "aria-label": "FAZ Environmental & Emergency Consulting — página inicial", children: /* @__PURE__ */ jsxs("picture", { children: [
      /* @__PURE__ */ jsx("source", { srcSet: logoWebp$1, type: "image/webp" }),
      /* @__PURE__ */ jsx("img", { src: logo$1, alt: "FAZ Environmental & Emergency Consulting", width: 360, height: 149 })
    ] }) }),
    /* @__PURE__ */ jsxs("nav", { id: "site-nav", className: `site-nav ${isMenuOpen ? "site-nav--open" : ""}`, "aria-label": "Navegação principal", children: [
      navLinks.map((link) => /* @__PURE__ */ jsx(NavLink, { to: link.to, className: ({ isActive }) => isActive ? "active" : "", children: link.label }, link.to)),
      /* @__PURE__ */ jsx(ContactCtaButton, { source: CONTACT_SOURCES.header, className: "btn btn-dark site-nav-cta", children: "Fale com um consultor" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "header-actions", children: /* @__PURE__ */ jsx(ContactCtaButton, { source: CONTACT_SOURCES.header, className: "btn btn-dark", children: "Fale com um consultor" }) }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: "menu-toggle",
        "aria-expanded": isMenuOpen,
        "aria-controls": "site-nav",
        "aria-label": isMenuOpen ? "Fechar menu" : "Abrir menu",
        onClick: () => setIsMenuOpen((open) => !open),
        children: [
          /* @__PURE__ */ jsx("span", { className: "menu-toggle-bar" }),
          /* @__PURE__ */ jsx("span", { className: "menu-toggle-bar" }),
          /* @__PURE__ */ jsx("span", { className: "menu-toggle-bar" })
        ]
      }
    )
  ] }) });
}
const logo = "/assets/logo-white-full-DEOzkdSB.png";
const logoWebp = "/assets/logo-white-full-DwunRkGr.webp";
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "site-footer", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxs("div", { className: "footer-grid", children: [
      /* @__PURE__ */ jsxs("div", { className: "footer-brand", children: [
        /* @__PURE__ */ jsxs("picture", { children: [
          /* @__PURE__ */ jsx("source", { srcSet: logoWebp, type: "image/webp" }),
          /* @__PURE__ */ jsx("img", { src: logo, alt: "FAZ Environmental & Emergency Consulting", width: 360, height: 149, loading: "lazy" })
        ] }),
        /* @__PURE__ */ jsx("p", { children: "Prevenção, prontidão e resposta para proteger operações e ecossistemas." })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "footer-col", "aria-label": "Navegação", children: [
        /* @__PURE__ */ jsx("h2", { children: "Navegação" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/solucoes", children: "Soluções" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/metodo-faz", children: "Método FAZ" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/sobre", children: "Sobre" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "footer-col", children: [
        /* @__PURE__ */ jsx("h2", { children: "Contato" }),
        /* @__PURE__ */ jsx("address", { children: /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "tel:+5521972228908", children: "+55 21 97222-8908" }) }),
          /* @__PURE__ */ jsx("li", { children: "Rio de Janeiro, RJ" }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ContactCtaButton, { source: CONTACT_SOURCES.footer, className: "btn-reset link-cta link-cta--accent", children: "Solicitar proposta" }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "footer-bottom", children: [
      /* @__PURE__ */ jsx("span", { children: "© 2026 FAZ Environmental & Emergency Consultoria." }),
      /* @__PURE__ */ jsx("a", { href: "/politica-de-privacidade", target: "_blank", rel: "noopener noreferrer", children: "Privacidade · Termos" })
    ] })
  ] }) });
}
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
const STORAGE_KEY = "faz-cookie-consent";
function getCampaignParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    gclid: params.get("gclid") ?? void 0,
    utmSource: params.get("utm_source") ?? void 0,
    utmMedium: params.get("utm_medium") ?? void 0,
    utmCampaign: params.get("utm_campaign") ?? void 0
  };
}
function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);
  function registerChoice(choice) {
    window.localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
    const payload = choice === "accepted" ? { choice, path: window.location.pathname, ...getCampaignParams() } : { choice, path: window.location.pathname };
    fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(() => {
    });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `cookie-consent ${visible ? "cookie-consent--visible" : ""}`,
      role: "dialog",
      "aria-live": "polite",
      "aria-label": "Aviso de cookies",
      children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Usamos cookies para melhorar a sua experiência de navegação. Ao continuar, você concorda com o uso de cookies conforme nossa",
          " ",
          /* @__PURE__ */ jsx("a", { href: "/politica-de-privacidade", target: "_blank", rel: "noopener noreferrer", children: "Política de Privacidade" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "cookie-consent-actions", children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: "btn btn-outline-dark", onClick: () => registerChoice("declined"), children: "Recusar" }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "btn btn-primary", onClick: () => registerChoice("accepted"), children: "Aceitar" })
        ] })
      ]
    }
  );
}
const SITE_URL = "https://fazenvironmental.com.br";
const SITE_NAME = "FAZ Environmental & Emergency Consulting";
const SITE_LOCALE = "pt_BR";
const ORGANIZATION = {
  telephone: "+55-21-97222-8908",
  addressLocality: "Rio de Janeiro",
  addressRegion: "RJ",
  addressCountry: "BR"
};
function Seo({ title, description, path, jsonLd }) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: url }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: SITE_NAME }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: SITE_LOCALE }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: url }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    jsonLd && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) })
  ] });
}
function SectionHeader({ eyebrow, title, description, as: Heading = "h2" }) {
  return /* @__PURE__ */ jsxs("div", { className: "section-header", children: [
    /* @__PURE__ */ jsx("span", { className: "eyebrow", children: eyebrow }),
    /* @__PURE__ */ jsx(Heading, { children: title }),
    /* @__PURE__ */ jsx("p", { children: description })
  ] });
}
function ServiceCard({ service }) {
  return /* @__PURE__ */ jsxs("article", { className: "service-card", children: [
    /* @__PURE__ */ jsx("span", { className: "number", "aria-hidden": "true", children: service.number }),
    /* @__PURE__ */ jsx("h3", { children: service.title }),
    /* @__PURE__ */ jsx("p", { children: service.description }),
    /* @__PURE__ */ jsx("ul", { children: service.bullets.map((bullet) => /* @__PURE__ */ jsx("li", { children: bullet }, bullet)) }),
    /* @__PURE__ */ jsx(ContactCtaButton, { source: serviceSource(service.title), className: "btn-reset link-cta", children: "Consultar este serviço →" })
  ] });
}
const services = [
  {
    number: "01",
    title: "Treinamentos IMO I, II e III",
    description: "Formação progressiva para equipes operacionais, supervisores e gestão que atuam diante de riscos de óleo.",
    bullets: [
      "Fundamentação, avaliação e resposta inicial",
      "Estratégias de contenção, recolhimento e gestão de resíduos",
      "Planejamento e execução de treinos de escala"
    ]
  },
  {
    number: "02",
    title: "ICS 100, 200 e 300",
    description: "Capacitação para organizações que respondem, coordenam ou envolvem incidentes de escala e natureza variável.",
    bullets: [
      "ICS 100/200 integrado: linguagem e estrutura inicial",
      "ICS 300: preparação de líderes para incidentes de maior escala",
      "Comando unificado, decisão e execução coordenada"
    ]
  },
  {
    number: "03",
    title: "Resposta a Emergência Offshore",
    description: "Treinamento prático e operacional a bordo para embarcações que confrontam cenários reais de emergência ambiental.",
    bullets: [
      "Navegação, segurança e operação de barreiras e sistemas",
      "Manobras, comunicação e coordenação sob pressão",
      "Simulações de falhas e resposta operacional imediata"
    ]
  },
  {
    number: "04",
    title: "Simulado de Resposta a Emergência",
    description: "Exercícios planejados sob medida para testar procedimentos, cadeia de comando, comunicação e capacidade de mobilização real.",
    bullets: [
      "Cenários alinhados aos riscos da operação",
      "Avaliação de desempenho e identificação de lacunas",
      "Relatório com recomendações práticas objetivas"
    ]
  },
  {
    number: "05",
    title: "Laudo de Coral-Sol",
    description: "Análise técnica de registros de espécies aquáticas para identificação de organismos invasores do gênero Tubastraea.",
    bullets: [
      "Coleta e análise de amostras em campo",
      "Classificação de espécies e potencial de invasão",
      "Laudo técnico com evidência profissional aplicável"
    ]
  },
  {
    number: "06",
    title: "Combate à Poluição por Óleo",
    description: "Curso de 8 horas focado em resposta operacional a derramamentos costeiros e de embarcações de risco.",
    bullets: [
      "Contenção, recolhimento e uso de barreiras e sorventes",
      "Procedimentos de contenção e segurança operacional",
      "Preparação para atuação segura e coordenada"
    ]
  },
  {
    number: "07",
    title: "OilRec Safety Check",
    description: "Auditoria completa da planta Oil Recovery em embarcações OSRV, com foco em segurança, operacionalidade e manutenção.",
    bullets: [
      "Inspeção funcional de sistemas e equipamentos críticos",
      "Diagnóstico de risco e não conformidades",
      "Plano de ação técnico e recomendações e priorização"
    ]
  },
  {
    number: "08",
    title: "Manutenção de Equipamentos OilRec",
    description: "Suporte técnico especializado para prevenção de falhas, desempenho e segurança dos equipamentos de recuperação de óleo.",
    bullets: [
      "Manutenção preventiva e corretiva",
      "Rastreabilidade e conformidade técnica",
      "Recomendação técnica para substituição e upgrade e reposição"
    ]
  },
  {
    number: "09",
    title: "Planos de Emergência e Estudos Técnicos",
    description: "Elaboração e revisão de Planos de Emergência Individual e documentos técnicos para operações e instalações aplicáveis.",
    bullets: [
      "Análise de cenários acidentais e de risco",
      "Estrutura de comunicação e responsabilidades",
      "Planos customizados para operação específica"
    ]
  }
];
function ServicesSection({ light = false, headingLevel = "h2" }) {
  return /* @__PURE__ */ jsx("section", { className: light ? "section section-light" : "section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx(
      SectionHeader,
      {
        as: headingLevel,
        eyebrow: "Linhas de serviço",
        title: "Da prevenção à resposta. Do plano à operação.",
        description: "Soluções integradas para formar pessoas, validar processos, aumentar a confiabilidade dos ativos e proteger operações e ecossistemas."
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "services-grid", children: services.map((service) => /* @__PURE__ */ jsx(ServiceCard, { service }, service.number)) })
  ] }) });
}
function CtaBanner() {
  return /* @__PURE__ */ jsxs("div", { className: "cta-banner", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "Não encontrou exatamente o que precisa?" }),
      /* @__PURE__ */ jsx("h2", { children: "Desenharemos soluções sob medida para o risco e a realidade da sua operação." })
    ] }),
    /* @__PURE__ */ jsx(ContactCtaButton, { source: CONTACT_SOURCES.ctaBanner, className: "btn btn-primary", children: "Construir um projeto personalizado" })
  ] });
}
function NextStepCta() {
  return /* @__PURE__ */ jsx("section", { className: "section next-step", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("span", { className: "eyebrow eyebrow--light", children: "Próximo passo" }),
    /* @__PURE__ */ jsx("h2", { children: "Sua operação está preparada para responder?" }),
    /* @__PURE__ */ jsx("p", { children: "Consulte treinamentos, auditorias ou projetos personalizados. Vamos construir a solução adequada ao seu cenário." }),
    /* @__PURE__ */ jsxs("div", { className: "next-step-actions", children: [
      /* @__PURE__ */ jsx(ContactCtaButton, { source: CONTACT_SOURCES.nextStep, className: "btn btn-primary", children: "Solicitar consulta" }),
      /* @__PURE__ */ jsx(ContactCtaButton, { source: CONTACT_SOURCES.nextStepSecondary, className: "btn btn-secondary", children: "Fale com um consultor" })
    ] })
  ] }) });
}
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  url: SITE_URL,
  telephone: ORGANIZATION.telephone,
  address: {
    "@type": "PostalAddress",
    addressLocality: ORGANIZATION.addressLocality,
    addressRegion: ORGANIZATION.addressRegion,
    addressCountry: ORGANIZATION.addressCountry
  },
  description: "Consultoria ambiental, capacitação técnica e prontidão operacional para organizações que não podem improvisar diante de uma emergência."
};
const heroBg = "/assets/hero-background-CdNKKpJ_.jpg";
const heroBgWebp = "/assets/hero-background-yBUUmot8.webp";
const heroStats = [
  { value: "+15", label: "anos de experiência em emergência" },
  { value: "NI 360°", label: "visão e atuação 360° na operação" }
];
function Home() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "FAZ Environmental & Emergency Consulting",
        description: "Consultoria ambiental, capacitação técnica e prontidão operacional para organizações que não podem improvisar diante de uma emergência.",
        path: "/",
        jsonLd: organizationJsonLd
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "hero", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "hero-copy", children: [
        /* @__PURE__ */ jsx("span", { className: "eyebrow eyebrow--light", children: "Environmental · Emergency · Offshore" }),
        /* @__PURE__ */ jsxs("h1", { children: [
          "Antecipamos riscos. Preparamos pessoas. ",
          /* @__PURE__ */ jsx("span", { className: "accent", children: "Protegemos operações." })
        ] }),
        /* @__PURE__ */ jsx("p", { children: "Consultoria ambiental, capacitação técnica e prontidão operacional para organizações que não podem improvisar diante de uma emergência." }),
        /* @__PURE__ */ jsxs("div", { className: "hero-actions", children: [
          /* @__PURE__ */ jsx(ContactCtaButton, { source: CONTACT_SOURCES.hero, className: "btn btn-primary", children: "Solicitar uma proposta" }),
          /* @__PURE__ */ jsx(Link, { className: "btn btn-secondary", to: "/solucoes", children: "Explorar soluções" })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "hero-stats", children: heroStats.map((stat) => /* @__PURE__ */ jsxs("li", { className: "hero-stat", children: [
          /* @__PURE__ */ jsx("div", { className: "value", children: stat.value }),
          /* @__PURE__ */ jsx("div", { className: "label", children: stat.label })
        ] }, stat.label)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hero-visual", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("picture", { children: [
        /* @__PURE__ */ jsx("source", { srcSet: heroBgWebp, type: "image/webp" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: heroBg,
            alt: "",
            width: 700,
            height: 580,
            ...{ fetchpriority: "high" }
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "hero-strip container", style: { padding: 0, gridColumn: "1 / -1" }, children: [
        /* @__PURE__ */ jsx("span", { children: "Resposta ambiental começa antes do incidente" }),
        /* @__PURE__ */ jsx(ContactCtaButton, { source: CONTACT_SOURCES.heroStrip, className: "btn-reset link-cta", children: "Avalie a prontidão da sua operação →" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(ServicesSection, { light: true }),
    /* @__PURE__ */ jsx("section", { className: "section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx(CtaBanner, {}) }) }),
    /* @__PURE__ */ jsx(NextStepCta, {})
  ] });
}
function Solucoes() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "Soluções",
        description: "Treinamentos IMO e ICS, resposta a emergência offshore, simulados, laudos de coral-sol e planos de emergência: conheça as linhas de serviço da FAZ.",
        path: "/solucoes"
      }
    ),
    /* @__PURE__ */ jsx(ServicesSection, { headingLevel: "h1" }),
    /* @__PURE__ */ jsx("section", { className: "section section-light", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx(CtaBanner, {}) }) })
  ] });
}
const steps = [
  {
    number: "01",
    title: "Diagnóstico real",
    description: "Partimos da operação, dos riscos, dos equipamentos e do nível de maturidade de cada equipe."
  },
  {
    number: "02",
    title: "Conhecimento segmentado",
    description: "Desenhamos processos complexos em módulos objetivos que aprofundam a compreensão e são aplicados na prática."
  },
  {
    number: "03",
    title: "Evolução progressiva",
    description: "Reorganizamos função a função, gradualmente, para que cada equipe da Costa avance com consistência e clareza."
  },
  {
    number: "04",
    title: "Prontidão comprovada",
    description: "Transformamos conteúdo em decisão, comunicação e capacidade de execução sob pressão."
  }
];
const stats = [
  { value: "+500", label: "profissionais capacitados" },
  { value: "Tier 3", label: "mais influente na resposta em derramamento" },
  { value: "Porto · Costa · Offshore", label: "atuação nos ambientes de operação relevantes — Campo + Gestão" }
];
function MetodoFaz() {
  return /* @__PURE__ */ jsxs("section", { className: "section method-section", children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "Método FAZ",
        description: "Diagnóstico real, conhecimento segmentado, evolução progressiva e prontidão comprovada: conheça a metodologia da FAZ, desenvolvida ao longo de 15 anos de campo.",
        path: "/metodo-faz"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "method-grid", children: [
        /* @__PURE__ */ jsxs("div", { className: "method-heading", children: [
          /* @__PURE__ */ jsx("span", { className: "eyebrow eyebrow--light", children: "Método FAZ" }),
          /* @__PURE__ */ jsx("h1", { children: "Experiência de campo transformada em prontidão." }),
          /* @__PURE__ */ jsx("p", { children: "Nossa metodologia foi desenvolvida ao longo de 15 anos de atuação em operações e exercícios reais. Cada projeto combina conteúdo técnico, vivência de campo para gerar equipes de maior capacidade, autonomia e coordenação." }),
          /* @__PURE__ */ jsx(ContactCtaButton, { source: CONTACT_SOURCES.metodoFaz, className: "btn-reset link-cta link-cta--light", children: "Conheça nosso time →" })
        ] }),
        /* @__PURE__ */ jsx("ol", { className: "method-steps", children: steps.map((step) => /* @__PURE__ */ jsxs("li", { className: "method-step", children: [
          /* @__PURE__ */ jsx("span", { className: "step-number", "aria-hidden": "true", children: step.number }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { children: step.title }),
            /* @__PURE__ */ jsx("p", { children: step.description })
          ] })
        ] }, step.number)) })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "stats-row", children: stats.map((stat) => /* @__PURE__ */ jsxs("li", { className: "stat-block", children: [
        /* @__PURE__ */ jsx("div", { className: "value", children: stat.value }),
        /* @__PURE__ */ jsx("div", { className: "label", children: stat.label })
      ] }, stat.label)) })
    ] })
  ] });
}
function Sobre() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "Sobre a FAZ",
        description: "Conheça a FAZ Environmental & Emergency Consulting: rigor técnico, aplicação prática e responsabilidade ambiental em cada projeto de resposta a emergências.",
        path: "/sobre"
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "about-grid", children: [
      /* @__PURE__ */ jsxs("div", { className: "about-copy", children: [
        /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "Fazendo a própria história" }),
        /* @__PURE__ */ jsx("h1", { children: "Nascemos para elevar o padrão da resposta ambiental." }),
        /* @__PURE__ */ jsx("p", { children: "A FAZ Environmental & Emergency Consulting nasceu da convicção de que conhecimento adquirido em operações reais precisa gerar algo maior: organizações mais preparadas, profissionais mais seguros e impactos ambientais menores. Reunimos experiência técnica, visão estratégica e vivência de campo para aproximar planejamento e execução, ajudando nossos clientes a construir capacidade de resposta que funciona quando cada decisão importa." }),
        /* @__PURE__ */ jsxs("ul", { className: "pill-tags", children: [
          /* @__PURE__ */ jsx("li", { className: "pill-tag", children: "Rigor técnico" }),
          /* @__PURE__ */ jsx("li", { className: "pill-tag", children: "Aplicação prática" }),
          /* @__PURE__ */ jsx("li", { className: "pill-tag", children: "Responsabilidade ambiental" })
        ] }),
        /* @__PURE__ */ jsx(ContactCtaButton, { source: CONTACT_SOURCES.sobre, className: "btn-reset link-cta about-link", children: "Conheça quem constrói a FAZ →" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "about-visual dot-grid-overlay", "aria-hidden": "true" })
    ] }) }) }),
    /* @__PURE__ */ jsx(NextStepCta, {})
  ] });
}
function Privacidade() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "Política de Privacidade",
        description: "Política de Privacidade da FAZ Environmental & Emergency Consulting: como coletamos, usamos e protegemos seus dados pessoais.",
        path: "/politica-de-privacidade"
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "section", children: /* @__PURE__ */ jsxs("div", { className: "container legal-content", children: [
      /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "Informações legais" }),
      /* @__PURE__ */ jsx("h1", { children: "Política de Privacidade" }),
      /* @__PURE__ */ jsx("h2", { children: "1. Introdução" }),
      /* @__PURE__ */ jsx("p", { children: "A FAZ Environmental & Emergency Consulting é a sua controladora de dados de acordo com a LGPD (Lei Geral de Proteção de Dados), ou seja, é a responsável por decidir como seus dados pessoais serão tratados na empresa." }),
      /* @__PURE__ */ jsx("p", { children: "Valorizamos a sua privacidade e estamos comprometidos em proteger os seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos as informações pessoais que você nos fornece ao acessar e usar nossos serviços." }),
      /* @__PURE__ */ jsx("h2", { children: "2. Coleta de Dados Pessoais" }),
      /* @__PURE__ */ jsx("p", { children: "Coletamos os seguintes dados pessoais:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Informações de Contato: nome, endereço de e-mail, telefone e empresa;" }),
        /* @__PURE__ */ jsx("li", { children: "Informações Operacionais: dados fornecidos em formulários de contato, como mensagens sobre treinamentos, auditorias ou projetos de interesse;" }),
        /* @__PURE__ */ jsx("li", { children: "Informações de Navegação: dados coletados automaticamente sobre a sua interação com o nosso site, como endereço IP, tipo de navegador, páginas visitadas e tempo gasto nas páginas." })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "3. Uso dos Dados Pessoais" }),
      /* @__PURE__ */ jsx("p", { children: "Utilizamos os seus dados pessoais para:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Prestação de Serviços: fornecer treinamentos, capacitações, auditorias, laudos técnicos e consultoria em resposta a emergências ambientais;" }),
        /* @__PURE__ */ jsx("li", { children: "Comunicação: entrar em contato com você sobre propostas, suporte e outras informações relevantes solicitadas por meio do site;" }),
        /* @__PURE__ */ jsx("li", { children: "Melhoria de Serviços: analisar como nossos serviços são utilizados para melhorá-los continuamente." })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "4. Compartilhamento de Dados Pessoais" }),
      /* @__PURE__ */ jsx("p", { children: "Não vendemos, trocamos ou transferimos para terceiros os seus dados pessoais sem o seu consentimento, exceto:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Prestadores de Serviços: empresas que nos ajudam a operar o nosso site, conduzir nosso negócio ou fornecer serviços a você, desde que essas partes concordem em manter essas informações confidenciais;" }),
        /* @__PURE__ */ jsx("li", { children: "Cumprimento da Lei: quando acreditarmos que a divulgação é apropriada para cumprir a lei, fazer cumprir as políticas do nosso site ou proteger os nossos direitos, propriedade ou segurança." })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "5. Proteção de Dados" }),
      /* @__PURE__ */ jsx("p", { children: "Implementamos uma variedade de medidas de segurança para manter a segurança dos seus dados pessoais quando você entra, envia ou acessa suas informações pessoais." }),
      /* @__PURE__ */ jsx("h2", { children: "6. Transferência Internacional de Dados" }),
      /* @__PURE__ */ jsx("p", { children: "Os dados coletados com seu consentimento podem ser armazenados fora do país (Brasil), dependendo dos fornecedores contratados para suporte às atividades da empresa, mas sempre mantendo os mesmos padrões de segurança adotados em nosso servidor próprio." }),
      /* @__PURE__ */ jsx("h2", { children: "7. Seus Direitos" }),
      /* @__PURE__ */ jsx("p", { children: "Você tem o direito de:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Confirmar a existência de tratamento de seus dados pessoais;" }),
        /* @__PURE__ */ jsx("li", { children: "Acessar os dados pessoais coletados;" }),
        /* @__PURE__ */ jsx("li", { children: "Corrigir ou alterar dados incompletos, incorretos ou desatualizados;" }),
        /* @__PURE__ */ jsx("li", { children: "Anonimizar, bloquear e eliminar dados pessoais tratados com o seu consentimento, desde que cumpridos os requisitos legais;" }),
        /* @__PURE__ */ jsx("li", { children: "Fazer a portabilidade dos dados para outro fornecedor de serviço ou produto, desde que respeitados os direitos e o segredo de negócio da FAZ;" }),
        /* @__PURE__ */ jsx("li", { children: "Limitar e se opor ao tratamento de dados;" }),
        /* @__PURE__ */ jsx("li", { children: "Revogar o consentimento previamente concedido, nos termos da lei;" }),
        /* @__PURE__ */ jsx("li", { children: "Pedir revisão das decisões baseadas unicamente em tratamento automatizado de dados pessoais que afetem seus interesses e obter informações sobre os critérios utilizados para essas decisões automatizadas." })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "8. Cookies" }),
      /* @__PURE__ */ jsx("p", { children: "Utilizamos cookies para melhorar a sua experiência no nosso site. Cookies são pequenos arquivos que um site ou seu provedor de serviços transfere para o disco rígido do seu computador através do seu navegador (se você permitir). Estes cookies permitem que o site reconheça o seu navegador e capture e lembre certas informações." }),
      /* @__PURE__ */ jsx("h2", { children: "9. Alterações na Política de Privacidade" }),
      /* @__PURE__ */ jsx("p", { children: "Reservamo-nos o direito de atualizar esta Política de Privacidade a qualquer momento. Notificaremos você sobre quaisquer mudanças, publicando a nova Política de Privacidade neste site." }),
      /* @__PURE__ */ jsx("h2", { children: "10. Contato" }),
      /* @__PURE__ */ jsx("p", { children: "Se você tiver alguma dúvida sobre esta Política de Privacidade ou desejar exercer qualquer um dos seus direitos, entre em contato conosco:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Nome da Empresa: FAZ Environmental & Emergency Consulting;" }),
        /* @__PURE__ */ jsxs("li", { children: [
          "Telefone: ",
          /* @__PURE__ */ jsx("a", { href: "tel:+5521972228908", children: "+55 21 97222-8908" }),
          ";"
        ] }),
        /* @__PURE__ */ jsx("li", { children: "Endereço: Rio de Janeiro, RJ." })
      ] })
    ] }) })
  ] });
}
function App({ router }) {
  return router(
    /* @__PURE__ */ jsxs(ContactProvider, { children: [
      /* @__PURE__ */ jsx("a", { href: "#conteudo-principal", className: "skip-link", children: "Pular para o conteúdo principal" }),
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx(ScrollToTop, {}),
      /* @__PURE__ */ jsx("main", { id: "conteudo-principal", children: /* @__PURE__ */ jsxs(Routes, { children: [
        /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/solucoes", element: /* @__PURE__ */ jsx(Solucoes, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/metodo-faz", element: /* @__PURE__ */ jsx(MetodoFaz, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/sobre", element: /* @__PURE__ */ jsx(Sobre, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/politica-de-privacidade", element: /* @__PURE__ */ jsx(Privacidade, {}) })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(CookieConsent, {})
    ] })
  );
}
function render(url) {
  const helmetContext = {};
  const html = renderToString(
    /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(App, { router: (children) => /* @__PURE__ */ jsx(StaticRouter, { location: url, children }) }) })
  );
  const { helmet } = helmetContext;
  const headTags = helmet ? `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}${helmet.script.toString()}` : "";
  return { html, headTags };
}
export {
  render
};
