# keystone-ip-tracking-plugin

Adds IP tracking to a list in Keystone 5.

This was written pretty quickly. Feel free to use it be not much testing yet... I might come back to it :)

## Usage 

```javascript
const Comment = {
  schemaDoc: "Fresh hot-takes from the internet",
  fields: {
    path: { type: Text, schemaDoc: "Unique path for comment" },
    comment: { type: Text, schemaDoc: "The comment" }
  },
  plugins: [ipTracking()]
};
```
