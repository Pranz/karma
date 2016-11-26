# API Spec

``` javascript
GET entities
[{
    type:"player" | "monster" | "spawn" | "trap" | "wall"
    health:1100,
    streanght: 190,
    pos:{x:x, y:y},
    texture:url
}]

PUSH possition
{
    dx: __,
    dy: __
}

PUSH punch
{

}

PUSH place
{
    type: "wall" | "trap",
}

PUSH createPlayer 
{
	name: <string>
}
```
