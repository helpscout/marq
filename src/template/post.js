const template = `---
title: "<%= marq.front_matter.title %>"
description: "<%= marq.front_matter.description %>"
date: "<%= marq.date %>"
slug: "<%= marq.slug %>"
---

<%= marq.content %>
`;

export default template;
