# API Spec

```javascript
GET entities
{
	*id*: {
	    type:"player" | "monster" | "spawn" | "trap" | "wall"
	    health: int,
	    strength: int,
	    pos: {x: float, y: float},
	    direction: radians(float)
	    texture:url
	},
	...
}

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

PUSH registerEntity 
{
	type: 'player',
}
```
