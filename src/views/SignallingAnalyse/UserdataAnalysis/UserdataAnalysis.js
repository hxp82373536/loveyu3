import React, {Component} from 'react';
import './UserdataAnalysis.css';
import * as d3 from 'd3';
import graph from './mock-d3.json';

// enter() : 获得数据集中比DOM元素集中多出来的数据
// exit() ：获得DOM元素集中比数据集中多出来的数据
const WIDTH = 960
const HEIGHT = 600
const DISTANCE = 150
class UserdataAnalysis extends Component {
  componentDidMount() {
    // 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异部操作阻塞UI)。
    console.log('---componentDidMount---');
    console.log('---graph---', graph);
    this.renderForceSvg();
  };

  // 力导向图
  renderForceSvg() {
    // color 颜色
    let color = d3.scaleOrdinal(d3.schemeCategory10);
    // 第一步
    // 设置 zoom 缩放
    let zoom = d3.zoom().scaleExtent([
      1 / 10,
      10
    ]).on('zoom', zoomed);

    function zoomed() {
      svg.selectAll('g').attr('transform', d3.zoomTransform(this));
    }

    // 第二步
    // 定义画板 在id为‘.force-svg’的标签内创建svg  设置长宽以及缩放
    // select：选择第一个对应的元素
    // selectAll：选择所有对应的元素
    // append：创建元素
    // style：设置样式
    // on('click', function())：click设置点击响应事件
    // call(zoom)：缩放函数
    let svg = d3.select(".force-svg").style('width', WIDTH).style('height', HEIGHT * 0.9).call(zoom);

    // 第三步
    // 建立力导向图模型
    // Center：重力点，设置力导向图的力重心位置。设置之后无论怎么拖拽，力的重心都不会变；
    // Collision：节点碰撞作用力，.strength参数范围为[0 ，1] 。
    // Links：连线的作用力；.distance设置连线两端节点的距离。
    // Many - Body：.strength的参数为正时，模拟重力，为负时，模拟电荷力；.distanceMax的参数设置最大距离。
    // Positioning：给定向某个方向的力。
    let simulation = d3.forceSimulation().force("link", d3.forceLink().id(d => d.id).distance(DISTANCE)).force("charge", d3.forceManyBody()).force("center", d3.forceCenter(WIDTH / 2, HEIGHT / 2))
    //.force("collide",d3.forceCollide(60).strength(0.2).iterations(5));

    //第四步
    //设置点和连接线，并绑定到力图
    //data(),enter(),append()：这仨是一起的，绑定数据到创建图形
    //attr：设置属性
    //style：设置样式
    let link = svg.append("g").attr("class", "links").selectAll("line").data(graph.links). //绑定数据
    enter(). //为数据添加对应数量的占位符
    append("line"); //在占位符上面生成折线（用path画）

    //边上的文字（人物之间的关系）
    let linetext = svg.append("g").attr("class", "linetext").selectAll(".linetext").data(graph.nodes).enter().append("text"). //创建园
    text(function(d) {
      return d.relation;
    });
    let defs = svg.append("g").attr("class", "imgdefs")
    function getimg(d, i) {
      var catpattern = defs.append("pattern").attr("id", "catpattern" + i).attr("height", 1).attr("width", 1)
      catpattern.append("image").attr("x", -(50 / 2 - 12)).attr("y", -(50 / 2 - 12)).attr("width", 50).attr("height", 50).attr("xlink:href", "/img/"+d.img)
      return "url(#catpattern" + i + ")";
    }

    let node = svg.append("g").attr("class", "nodes").selectAll("circle").data(graph.nodes).enter().append("circle"). //创建园
    attr("r", 16). //设置半径
		attr("stroke",function(d,i){
			console.info(d,i)
			return color(d.group)
		}).
    attr("fill", function(d, i) {
      let result = getimg(d, i)
      console.info(result)
      return result
    }).on("mouseover", function(d, i) {
      console.info(111)
    }).on("mouseout", function(d, i) {
      console.info(222)
    }).call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)).on('click', clickNode);

    node.append("title").text(function(d) {
      return d.id;
    });

    simulation.nodes(graph.nodes).on("tick", ticked);

    simulation.force("link").links(graph.links);

    function ticked() {
      link.attr("x1", function(d) {
        return d.source.x;
      }).attr("y1", function(d) {
        return d.source.y;
      }).attr("x2", function(d) {
        return d.target.x;
      }).attr("y2", function(d) {
        return d.target.y;
      });

      node.attr("cx", function(d) {
        return d.x;
      }).attr("cy", function(d) {
        return d.y;
      });
    }
    // });

    function dragstarted(d) {
      if (!d3.event.active)
        simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    // dragged 拖拽
    function dragged(d) {
      // console.log(d3.event.x,d3.event.y,d3.event);
      // 第一种方法
      d.fx = d3.event.x;
      d.fy = d3.event.y;
      // 第二种方法
      // d3.event.subject.fx = d3.event.x;
      // d3.event.subject.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active)
        simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // 点击节点事件
    function clickNode(d, i, arr) {
      console.log(d, i, arr);
    }

  };
  render() {
    return (<div className="App">
      <svg className="force-svg"></svg>
    </div>);
  }
}

export default UserdataAnalysis;
