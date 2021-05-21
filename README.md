# Atlassian Confluence API

The goal is to create a new api to read, create, and delete Confluence content.

## Docs

- https://docs.atlassian.com/ConfluenceServer/rest/7.12.1/
- https://developer.atlassian.com/cloud/confluence/rest-api-examples/

## Software
- Node
- Axios
- Body-parser
- Express

## RUN

```
yarn dev
```

## DEMO

### API Create

- input
```
curl http://localhost:3000/confluence/create/\?title\=test+2\&content\=text+body
```

- ouput
```
{"codigo":200,"mensaje":"98372"}
```

### API Get ID

- input
```
curl http://localhost:3000/confluence/filter\?id\=98372
```

- ouput
```
{"codigo":200,"mensaje":"text body"}
```

### API Get Title

- input
```
curl http://localhost:3000/confluence/filter\?title\=Hello+Word
```

- ouput
```
{"codigo":200,"mensaje":"text body"}
```
