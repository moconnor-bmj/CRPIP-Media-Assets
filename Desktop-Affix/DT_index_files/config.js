/* userAgentRegExp: is a regular expression how in the user agent a version number can be found.
 * version: is a version of the user agent that is not supported, this will cover all the versions before that.
 */
updateBrowserOptions = {
  userAgentRegExp: ['MSIE ([0-9]{1,}[\.0-9]{0,})'],
  version: [7.0]
}