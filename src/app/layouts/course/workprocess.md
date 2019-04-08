# This is the workprocess and the generation of the course component
#   and subcomponents. The process is the following.

## Creation
_ng generate component layouts/course_
    __src/app/layouts/course/course.component.*__
    Created the course component.

_touch src/app/shared/models/course.ts_
    __src/app/models/course.ts__
    Created the course model. Most components require this model.

_touch src/app/shared/models/lesson.ts_
    __src/app/models/model.ts__
    Created the lesson model. Course-Detail subcomponent requires it.

_ng generate service shared/services/course_
    __src/app/shared/services/course.service.ts__
    Created the course service to feed components such as add-course.

_ng generate service shared/services/lesson_
    __src/app/shared/services/lesson.service.ts__
    Created the lesson service to feed components such as course-detail.

_ng generate component shared/components/no-courses-found_

_ng generate component layouts/course/add-course_
    __src/app/layouts/course/add-course/add-course.component.*__
    Created the add-course subcomponent.

_ng generate component layouts/course/best-course_
    __src/app/layouts/course/best-course/best-course.component.*__
    Created the best-course subcomponent.

_ng generate component layouts/course/course-list_
    __src/app/layouts/course/course-list/course-list.component.*__
    Created the course-list subcomponent.

_ng generate component layouts/course/course-detail_
    __src/app/layouts/course/course-detail/course-detail.component.*__
    Created the course-detail subcomponent.