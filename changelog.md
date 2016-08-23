---
  title: Theme Changelog
  subtitle: Lists all changes to each version of triangular
  layout: docs.hbs
---

# Version 1.0.0
> Release Date : 5th June 2015

- Initial ThemeForest Submit

# Version 1.1.0
> Release Date : 11th June 2015

- Updated Angular Material to 0.10.0-rc1
- Changed todo icon to use material font
- Removed ng-material-dropmenu and replaced with official version in 0.10.0-rc1
- Updated CountUp js
- Removed gravatar js from bower & lock page
- Updated Angular Translate to 2.7.2
- Wiget titles & subtitles now use ng-bind-html to allow special chars (&,^,%,$,etc)
- Fix warning in email date parsing with moment
- Fix missing JS example on chips element page
- Fix back home button on 500 page
- Fix build to include weather icons
- Fix for controls on Google Maps
- Fix right sidebar on ToDo page

# Version 1.1.1
> Release Date : 12th June 2015

- Update to Angular Material 0.10.0-rc4
- Fixed issue on email list for firefox
- Improved performance of scrolling on email pages
- Fixed scrollbar behaviour on sidebar
- Fixed bower install problem being caused by countUp.js

# Version 1.1.2
> Release Date : 17th June 2015

- Update to Angular Material 0.10.0
- Restyled menu scrollbars for Windows ( IE and Chrome )
- Added FAB Speed Dial & FAB Toolbar element example pages
- Added Fab Speed Dial to General Blog Widget
- Added Menu example elements page
- Added delete todo option
- Added share button to blog widget in General Dashboard
- Fix toolbar in IE10

# Version 1.1.3
> Release Date : 19th June 2015

- Fixed icon elements example buttons - used suggestion in [issue 3181](https://github.com/angular/material/issues/3181)
- Added weather icons ui page
- Added Textangular example elements page
- Fixes for Internet Explorer 10
- Updated docs with better node install instructions

# Version 1.2.0
> Release Date : 26th June 2015

- Added notifications on main dashboard
- Added animation on toolbar budges
- Added time-line page
- Added option for collapsible side menu
- Changed logo markup

# Version 1.2.1
> Release Date : 29th June 2015

- Fixed time-line page on mobile IOS
- Fixed collapsible menu button
- Fixed toggle icon animation for sub menus

# Version 1.3.0
> Release Date : 13th July 2015

- Added calendar translations so calendar widget can now be multi language
- Added avatar option to widget title
- Updated gulp-sass to 2.0.3 to allow better compatibility with latest versions of node.js
- Updated gulp-ng-annotate to 1.0.0 to allow better compatibility with latest versions of node.js
- Added media query that fixes printing out admin pages
- Fixed bug in minify sidemenu on email pages
- Minor bugfixes
- Added new Social Dashboard

# Version 1.4.0
> Release Date : 26th July 2015

- Fix for SASS when compiling using command line
- Fix for sidebar scroll bars in FireFox
- Fixed bug in Breadcrumbs when click icons in email toobar
- Fixed delete email functionality
- Added fix for scrolling long emails
- Updated Angular Material to 0.10.1-rc3
- NEW FEATURE Added new Calendar module

# Version 1.5.0
> Release Date : 10th August 2015

- Fixed switching from email to todo in mobile sized screens
- Fixed scrolling content on Gallery page
- Better responsive layout for Todo App
- Added highlightjs to bower (fixes build error due to changes in angular-highlightjs)
- Fixed some aria-label warnings
- Changed number of pages to total items in tables pagination (now reads 1-5 of 10) thanks Vasillis
- Added new material background images and CSS classes
- Added angular-material-data-table package
- Added new LoaderService to allow controllers to turn loader on/off
- Update material angular to 0.10.1-rc5
- Changed 404 & 500 background pages
- NEW Added 30 extra material backgrounds
- NEW Form Wizard
- NEW Advanced Table Element
- NEW Added GitHub access for buyers
- Used one time binding and removal of watches to increase performance by 70%
- Removed all usage of translate filter and replaced with directive (better performance)
- Added Chinese and Portuguese translations

# Version 2.0.0
> Release Date : 31st August 2015

- Code style changed to match https://github.com/johnpapa/angular-styleguide
- Triangular moved into a module to make it easier to drop the code into existing apps or creating new ones
- More modular structure
- Authentication Module: Error messages now only show when input has been changed
- Authentication Module: All pages now use site wide logo and name
- Glup: Replaced JSHint with ESLint and ESLint Angular Plugin
- Gulp: Stopped debug server crash when js has syntax error
- Gulp: Added server port option
- Gulp: Added eslint-angular plugin to check for AngularJS best practices
- Breadcrumbs: New faster breadcrumbs
- Layouts: new page layout examples
- Layouts: new layout provider & service to easily modify page layouts
- Dashboards: removed title attribute to stop popup title.
- NEW Profiler module to check speed of AngularJS
- Calendar: Improved looks and mobile responsiveness.
- Docs: Added version migration guide to docs

# Version 2.0.1
> Release Date : 4th September 2015

- Turn off profiler by default.
- Moved font family CSS into app.scss from triangular module.
- Changed layout of analytics dashboard to look better on mobile
- Fixed styling for select and nav with dark knight theme.
- Fixed button links in 404 & 500 pages
- Fixed typo in first tables example
- Fixed typo in timeline
- Fixed double refresh from browser sync
- Fixed scrolling background bug in chrome & safari
- Fixed eslint errors
- Fixed menu focus on email detail view
- updated eslint and eslint-angular-plugin
- Updated docs to match new 2.0 code

# Version 2.1.0
> Release Date : 23rd September 2015

- Fixed bug when adding new events (not keeping data in calendar)
- Fixed bug in countupto directive options
- Added show toolbar option to layout
- Added new Sales Dashboard
- Added daggable Widgets option
- Added dynamic menu example (Menu / Dynamic Menu)
- Improved triMenu service to allow dynamic menus
- Updated chart.js and examples
- Updated Material Design Iconic Font to 2.1.2 (65 New Icons!)

# Version 2.2.0
> Release Date : 1st October 2015

- app.scss now imports angular-material.scss file (gives access to angular material variables)
- Added nicer hover effect to draggable widgets
- Added isFormValid function to wizard
- Updated to angular material 0.11.1
- Fixed 0.11.1 padding issues on dashboards
- Fixed 0.11.1 layout issues on dashboards
- Fixed arrows on table example
- Fixed bug in scatter chart example
- Datepicker added to sales dashboard dialog
- Datepicker added to events dialog
- Updated AngularJS to 1.4.7

# Version 2.3.0
> Release Date : 23rd October 2015

- Added bower package for easy maintenance of apps
- Updated docs with new create app documentation
- Added check for footer when injected (stops adding extra footers)
- Added menu badges
- Updated to angular material 0.1.0-rc1
- Fixed dashboard layouts & widgets to work with angular material 0.1.0-rc1
- Added back timeline
- Added file uploader
- Added function to set footer copyright (thanks jeffsteinmetz)
- Fixes for table localization (thanks merqurio)
- Fixes for Safari browser compatibility

# Version 2.4.0
> Release Date : 7th December 2015

- Converted material backgrounds to jpg - thanks TheRealDuckboy
- Fixed bug in toolbar icon - thanks jeffsteinmetz
- Menu improvements - thanks dixso
- Fixed wrong module name in elements - thanks movibe
- Fixed layout issues in wizard
- Updated to new angular material RC6
- New router module that adds / updates title
- New Fullscreen toggle
- Updated all node.js packages
- Updated AngularJS to 1.4.8
- Fixed gulp tasks to work with latest node packages

# Version 2.5.0
> Release Date : 23rd December 2015

- Fixed tri wizard to work with ng-repeated inputs
- Updated node packages to latest versions
- Update to Material Angular 1.0.1 whooop
- Fixed bug in profile password fields
- Changed layout/flex/media classes to work with material angular 1.0.1 (uses new xs instead of sm)
- Updated docs about bower package using https instead of ssh
- Removed ngTouch package (no longer needed by angular material)
- Fixed FAB speed dial remaining open on General Dashboard
- Updated all dialogs to use new angular material 1.0.1 markup

# Version 2.5.1
> Release Date : 10th February 2016

- Fixed active email highlight in email list
- Fixed ng-messages in authentication pages
- Fixed menu background color on mobile side menu
- Fixed avatars in widget titles
- Chrome 48 bug fix for flex-box layout
- Updated to Angular Material 1.0.5
- Fixed header title in FireFox
- Fixed email list styling
- Fixed Dashboard widget chart widths

# Version 2.6.0
> Release Date : 16th March 2016

- Fixed translate gulp task.
- Added watch to countupto directive
- Fixed bug where ng-messages covering inputs
- Fixed form issues in authentication pages
- Table titles now translatable
- Upgraded packages
    - md-data-table to 0.9.11
    - angular-dragula to 1.2.2,
    - angular-google-chart to 0.1.0,
    - angular-google-maps to 2.3.2,
    - angular-highlightjs to 0.5.1,
    - angular-local-storage to 0.2.5,
    - angular-material to 1.1.0-rc1,
    - angular-material-data-table to 0.9.12,
    - angular-moment to 1.0.0-beta.4,
    - angular-resource to 1.4.8,
    - angular-sanitize to 1.4.8,
    - angular-translate to 2.10.0,
    - angular-translate-loader-partial to 2.10.0,
    - angular-translate-storage-cookie to 2.10.0,
    - angular-translate-storage-local to 2.10.0,
    - angular-ui-calendar to 1.0.1,
    - angular-ui-router to 0.2.18,
    - countUp.js to 1.6.1,
    - font-awesome to 4.5.0,
    - jquery to 2.2.1,
    - material-design-iconic-font to 2.2.0,
    - textAngular to 1.5.0,
    - ng-file-upload to 12.0.1
- Added template override options to triLayoutProvider to allow users to override templates for left sidebar, the right sidebar, the content, the toolbar and the footer.
- Fixed icon button widths in toolbar
- Changed email list in secondary sidebar to use new md-dense list
- Updated documentation
- Added new card examples to elements / cards
- Restyle of email card and list
- Better display of scrollbars on Windows IE10+ & Chrome
- Fixed layout of authentication pages in IE11+

# Version 2.6.1
> Release Date : 18th March 2016

- Moved loader watches into triangular run (catches events earlier)
- Changed services to factories to match John Pappa style
- Removed calls to API in auth pages
- Added docs for menus
- Added loader example to elements
- Added datepicker example

# Version 2.6.2
> Release Date : 29th March 2016

- Fixed Side Navigation Toggle
- Upgraded md-table examples with progress bar functionality
- Updated Documentation with examples for Template Overriding

# Version 2.6.3
> Release Date : 7th April 2016

- Fixed unwanted animation on table advanced when select search or check item
- Updated material to 1.1.0-rc2
- Fix for flash of default theme until this issue is resolved https://github.com/angular/material/pull/7427
- Updated Docs with further detail on template customisations

# Version ???
> Release Date : ???

- Translations are now optional - include app.translation module if you need multi-language
- Moved translation files out of modules and into one app i18n folder in the app
- Updated Angular Material to 1.1.0-RC4
