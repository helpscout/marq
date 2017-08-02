const template =
`---
title: "<%= front_matter.title %>"
description: "<%= front_matter.description %>"
date: "<%= date %>"
slug: "<%= slug %>"
---

<%= content %>
`;

export default template;
