type Reducer<T> = (initial: T) => T;
type DefaultRootState<Reducer> = {
  [P in keyof Reducer]: Reducer[P] extends (initial: infer R) => infer R
    ? R
    : any;
};
type MapStateToProps<R, M = object> = (state: R) => M;

interface Connect<T> {
    <U extends null>(mstp?: U): T;
    <U>(mstp: U): U extends (state: any) => infer R ? R: number;
}

const connect = function<T> (): Connect<T>{
    return function(mstp){
        if(typeof mstp == "function") {
            return mstp()
        }
        return mstp;
    }
}
/* 
app state
*/
// state 1
type state1 = {
  a: string;
  b: string;
};
type state1Reducer = Reducer<state1>;

// state 2
type state2 = {
  x: number[];
  y: string[];
};
type state2Reducer = Reducer<state2>;

// combained redurecrs
type rootReducer = {
  state1: state1Reducer;
  state2: state2Reducer;
};

// root state
type RootState = DefaultRootState<rootReducer>;

// map state 1
type MapState1 = {
  width: string;
};

/*
 # app
 */
const mapState1: MapStateToProps<RootState, MapState1> = (state) => ({
  width: state.state1.a + "px",
});

// connector
const connector1 = connect<RootState>()();
const connector2 = connect<RootState>()(mapState1);

console.log(typeof mapState1);

