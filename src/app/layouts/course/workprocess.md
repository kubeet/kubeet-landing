# This is the workprocess and the generation of the course component
#   and subcomponents. The process is the following.

## Creation
_ng generate component layouts/course_
    __src/app/layouts/course/course.component.*__
    Created the course component, but it's missing its .routing.ts and its .module.ts implementation that Product has in its root.

_touch shared/models/course.ts_
    __src/app/models/course.ts__
    Created the course model for the MVC System. Component add-course and many others require this model.

_ng generate component layouts/course/add-course_
    __src/app/layouts/course/add-course/add-course.component.*__
    Created the add-course subcomponent.

_ng generate service shared/services/course_
    __src/app/shared/services/course.service.ts__
    Created the course service to feed components such as add-course.

_ng generate component layouts/course/best-course_
    __src/app/layouts/course/best-course/best-course.component.*__
    Created the best-course subcomponent.

