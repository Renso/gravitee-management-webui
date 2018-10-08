# API Portal Headers

Add a list of name/value to display in the api header.
The name could be used as is, or could be a translated key.

The value can also be an "hard coded" value or you can use templating like in documentation pages.

See following examples :

Name | Value
----- | ------
api.version | `${api.version}`
api.endpoint | `${api.proxy.contextPath}`
api.publishedAt | `${(api.deployedAt?long)!}`
My hard coded name | `My hard coded value`
