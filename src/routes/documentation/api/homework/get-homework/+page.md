---
title: API - Get Homework
author:
  name: Dlurak
  link: https://github.com/Dlurak
date: 2023-11-11
---

<script>
    import Information from '$lib/documentation/Information.svelte'
    import Request from '$lib/documentation/Request.svelte'
    import Response from '$lib/documentation/response/Response.svelte'
</script>

# Getting Homework

## Get Homework

To get paginated homework, you can send a `GET` request to `/homework` with the following query parameters in the url:

### Query-Parameters

#### School

The school to get homework for. Use the unique name of the school. This parameter is required.

#### Class

The class to get homework for. Use the unique name of the class. This parameter is required.

#### Page

The page to get. This parameter is required. The first page is `1`.
The total amount of pages can be found in the response body under the key `totalPageCount`.

#### PageSize

The amount of homework to get per page. This parameter is required.

### Response

<Response
status={200}
response={[
{
field: 'status',
type: 'string',
description: 'The status of the request.',
allowedValues: ['success']
},
{
field: 'message',
type: 'string',
description: 'A short message describing the status'
},
{
field: 'data',
type: 'object',
description: 'The actual data'
},
{
field: 'data.homework',
type: 'object[]',
description: 'An array of homework objects'
},
{
field: 'data.homework.creator',
type: 'string',
description: 'The id of the user who created the homework'
},
{
field: 'data.homework.class',
type: 'string',
description: 'The id of the class the homework is for'
},
{
field: 'data.homework.createdAt',
type: 'number',
description: 'The unix timestamp in ms when the homework was created in milliseconds'
},
{
field: 'data.homework.from',
type: 'object',
description: 'The date when the homework is from, this can differ from the date it was created',
},
{
field: 'data.homework.from.day',
type: 'number',
description: 'The day of the month when the homework is from',
max: 31,
min: 1
},
{
field: 'data.homework.from.month',
type: 'number',
description: 'The month when the homework is from',
max: 12,
min: 1
},
{
field: 'data.homework.from.year',
type: 'number',
description: 'The year when the homework is from',
},
{
'field': 'data.homework.assignments',
'type': 'object[]',
'description': 'An array of assignments',
},
{
field: 'data.homework.assignments.subject',
type: 'string',
description: 'The subject the assignment is for, e.g. "Math"'
},
{
field: 'data.homework.assignments.description\_',
type: 'string',
description: 'The task of the assignment, in real this isn\'t called "description\_" but "description" but this is a reserved keyword in our documentation generator'
},
{
field: 'data.homework.assignments.due',
type: 'object',
description: 'The date when the assignment is due',
},
{
field: 'data.homework.assignments.due.day',
type: 'number',
description: 'The day of the month when the assignment is due',
max: 31,
min: 1
},
{
field: 'data.homework.assignments.due.month',
type: 'number',
description: 'The month when the assignment is due',
max: 12,
min: 1
},
{
field: 'data.homework.assignments.due.year',
type: 'number',
description: 'The year when the assignment is due',
},
{
field: 'data.totalPageCount',
type: 'number',
description: 'The total amount of pages'
},
]}
/>

It took me quite long to migrate that because I had to write the component for the response body and to send a request. So I will do the rest of this page later once I find the time and motivation to do so. PR are welcome ;)

<Request uri="homework" urlParams={{
    school: {
        value: 'Lioba',
        active: true
    },
    "class": {
        value: '10b',
        active: true
    },
    page: {
        value: '1',
        active: true
    },
    pageSize: {
        value: '2',
        active: true
    }
}} />

## Get all Homework

<Information>
    Unless you have a specific reason to get all homework, you should probably get paginated homework instead.
</Information>
