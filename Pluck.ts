type Pluck = <T, P extends keyof T>(o:T, properties : P[]) => T[P][];

const a:any = {
  x:1,
  y:2
}


const pluck:Pluck = (o, properties) => {
  return properties.map(n => o[n]);
}

console.log(pluck(a,["x","z"]))
