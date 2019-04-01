# This is the workprocess and the generation of the course component
#   and subcomponents. The process is the following.

## Creation
_ng generate component layouts/course_
    _src/app/layouts/course/*_
    Created the course component, but it's missing its .routing.ts and its .module.ts implementation that Product has in its root.

_touch shared/models/course.ts_
    _src/app/shared/services/course.service_
    Created the course model for the MVC System. Component add-course and many others require this model.

_ng generate component layouts/course/add-course_ __Working 0__
    _src/app/layouts/course/add-course/*_
    Created the add-course subcomponent.

_ng generate service shared/services/course_ __Working 1__
    __abc__
    Created the course service to feed components such as add-course.