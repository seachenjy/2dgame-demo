var point = function(x,y,parent){
    this.x = x
    this.y = y
  
    //从起点到当前点的代价值
    this.g = !!parent ? (parent.g + (parent.x != x && y != parent.y) ? 14 : 10) : 10
    this.p = parent //父
    this.hash = `${x}_${y}`
  }
  
  //起点到当前点，当前点到目标点，综合值
  point.prototype.get_price = function(endPoint){
    return this.g + Math.abs(endPoint.x - this.x) * 10 + Math.abs(endPoint.y - this.y) * 10
  }
  
  //下、左下、左、左上、上、右上、右、右下
  point.prototype.childs = function(){
    return [
      new point(this.x,this.y+1,this),
      new point(this.x-1,this.y+1,this),
      new point(this.x-1,this.y,this),
      new point(this.x-1,this.y-1,this),
      new point(this.x,this.y-1,this),
      new point(this.x+1,this.y-1,this),
      new point(this.x+1,this.y,this),
      new point(this.x+1,this.y+1,this),
    ]
  }
  
  var Astar = function(map,startPoint,endPoint){
    this.map = map
    this.col = map.length
    this.row = map[0].length
    this.startPoint = startPoint
    this.endPoint = endPoint
    this.closeSet = {}
    this.openSet = [startPoint]
    //不能通过的加入关闭
    this.map.map((row,rowindex) => {
      row.map((col,colindex) => {
        if(col != 1){
          this.closeSet[colindex+"_"+rowindex] = "0"
        }
      })
    })
  }
  
  Astar.prototype.getPath = function(){
    while(this.openSet.length > 0){
  
      if(this.openSet[0].x == this.endPoint.x && this.openSet[0].y == this.endPoint.y){
        return this.openSet[0]
      }
  
      this.closeSet[this.openSet[0].hash] = "0"
      let childs = this.openSet[0].childs(this.row,this.col)
      let newchild = []
      for(let i=0,max=childs.length; i<max; i++){
        if(childs[i].x < 0 || childs[i].x >= this.row || childs[i].y < 0 || childs[i].y >= this.col){
          // debugger
          continue
        }
  
        if(this.closeSet.hasOwnProperty(childs[i].hash)){
          // debugger
          continue
        }
        this.closeSet[childs[i].hash] = "0"
        newchild.push(childs[i])
      }
  
      if(newchild.length > 0){
        newchild.sort((a,b)=>{
          return a.get_price(this.endPoint) - b.get_price(this.endPoint)
        })
        this.openSet.unshift(...newchild)
      }else{
        this.openSet.splice(0,1)
      }
  
    }
    return "no path"
  }
  
  
  
    // 定义地图数组 0表示可以通过，1表示不可以通过
    let map = [//0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 .... 30
                [1,0,0,0,0,0,0,0,0,0],//0
                [1,1,1,1,1,1,1,1,1,1],//1
                [0,0,0,0,0,0,0,0,0,1],//2
                [1,1,1,1,1,1,1,1,1,1],//3
                [1,0,0,0,0,0,0,0,0,0],//4
                [1,1,1,1,1,1,1,1,1,1],//5
                [0,0,1,0,0,0,0,0,0,1],//6
                [1,1,1,1,1,1,1,1,1,1],//7
                [1,0,0,0,0,0,0,0,0,0],//8
                [1,1,1,1,1,1,1,1,1,1],//9
                [0,0,0,0,0,0,0,0,0,1],//00
                [1,1,1,1,1,1,1,1,1,1],//00
                [1,0,0,0,0,0,0,0,0,0],//02
                [1,1,1,1,1,1,1,1,1,1],//03
                [1,1,1,1,1,1,1,1,1,1],//04
              ];
    
    let startPoint = new point(0,0)
    let endPoint = new point(9,14)
    let mya = new Astar(map,startPoint,endPoint)
  
    function main(){
  
      let path = mya.getPath()
      let result = []
      for(let i=0,max=map.length;i<max;i++){
          let _r = []
          for(let j=0,m=map[0].length;j<m;j++){
              _r.push(0)
          }
        result.push(_r)
      }
      while(!!path){
          result[path.y][path.x] = 1
          if(path.hasOwnProperty('p')){
            path=path.p  
          }else{
            path=null
          }
      }
      let html=""
  
      console.log(result)
      for(let i=0,max=result.length;i<max;i++){
        let span = ""
        for(let j=0,m=result[i].length;j<m;j++){
          let _color = map[i][j] == 1 ? 'class="active"' : 'class="disable"'
          let _t = result[i][j]==1 ? '*' : ''
          span += `<span ${_color}>${_t}</span>`
        }
        html += `<div>${span}</div>`
      }
      
      document.body.innerHTML = html
    }
  