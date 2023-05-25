# view-count-badge

Generates badges for showing view counts using [Custom Icon Badges](https://github.com/DenverCoder1/custom-icon-badges). The API request should be made in the following format:

```https://view-count-badge.zohan.tech/{username}/{project}?logo=paintbrush&logoColor=white```

The ```username``` and ```project``` can be anything; it is used to differentiate various applications. All query parameters will be forwarded to Custom Icon Badges, so those can be used to customize the badge.