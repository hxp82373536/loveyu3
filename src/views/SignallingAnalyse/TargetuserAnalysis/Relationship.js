import React,{Component} from "react";
import * as d3 from "d3";
import $ from "jquery/dist/jquery.min";

export default class Relationship extends Component{
    componentDidMount(){
        d3.json("./mock/mock-d3.json", function(json) {
            function GroupExplorer(wrapper,config){
                var defaultConfig={
                    data:{"nodes":[],"links":[]},
                    width:1366,
                    height:window.innerHeight-129,
                    distance:100,
                };
                $.extend(true,defaultConfig,config);
                //获取所有节点的连接点数据包括对应的value等
                defaultConfig.data.links.forEach(function (e) {
                    if(typeof e.source!="number"&&typeof e.target!="number"){
                        var sourceNode = defaultConfig.data.nodes.filter(function (n) {
                                return n.id === e.source;
                            })[0],
                            targetNode = defaultConfig.data.nodes.filter(function (n) {
                                return n.id === e.target;
                            })[0];
                        e.source = sourceNode;
                        e.target = targetNode;
                    }
                });
                var _this=this,highlighted=null,dependsNode=[],dependsLinkAndText=[];
                this.color = d3.scaleOrdinal(d3.schemeCategory10);

                var zoom = d3.zoom()
                    .scaleExtent([0.2,10])
                    .on("zoom",function(){
                        _this.zoomed();
                    });
                //设置svg元素和g节点的样式的宽高等
                this.vis = d3.select("relationship").append("svg:svg")
                    .attr("width", defaultConfig.width)
                    .attr("height", defaultConfig.height)
                    .call(zoom).on("dblclick.zoom", null);


                this.vis=this.vis.append('g').attr('class','all')
                    .attr("width", defaultConfig.width)
                    .attr("height", defaultConfig.height)


                this.force = d3.forceSimulation()
                    .nodes(defaultConfig.data.nodes)
                    .force("link", d3.forceLink(defaultConfig.data.links).distance(defaultConfig.distance))
                    .force("charge", d3.forceManyBody())
                    .force("center", d3.forceCenter(defaultConfig.width / 2, defaultConfig.height / 2))
                    .force("collide",d3.forceCollide(60).strength(0.2).iterations(5))

                this.vis.append("svg:defs").selectAll("marker")
                    .data(["end"])
                    .enter().append("svg:marker")
                    .attr("id","arrow")
                    .attr('class','arrow')
                    .attr("viewBox", "0 -5 10 10")
                    .attr("refX", 27)
                    .attr("refY", 0)
                    .attr("markerWidth", 9)
                    .attr("markerHeight", 16)
                    .attr("markerUnits","userSpaceOnUse")
                    .attr("orient", "auto")
                    .append("svg:path")
                    .attr("d", "M0,-5L10,0L0,5")
                    //清除连接线的箭头指向
                    .attr('fill','none');

                //设置连接线
                this.link = this.vis.selectAll("line.link")
                    .data(defaultConfig.data.links)
                    .enter().append("svg:path")
                    .attr("class", "link")
                    .attr('stroke-width',1)
                    .attr('id', function (d) {
                        return d.source.index + '_' + d.target.index
                    })
                    .attr('marker-end', function (d) {
                        if (d.source.index == d.target.index) {
                            return false; //不应该有指向自己的关系 异常处理
                        } else {
                            return "url(#arrow)"
                        }
                    })
                    //设置连接线的颜色
                    .attr('stroke',function(d,i){
                        return _this.color(i);
                    })
                    //                      .attr("stroke",function(d){
                    //                          return d.color;  //关系文字
                    //                      })

                    .attr('fill','none');

                //
                var dragstart=function(d, i) {
                    d.fixed=true;
//                  console.info(d3.event.subject)
                    _this.force.stop();
                    d3.event.sourceEvent.stopPropagation();
                };

                var dragmove=function(d, i) {
                    d.px += d3.event.dx;
                    d.py += d3.event.dy;
                    d.x += d3.event.dx;
                    d.y += d3.event.dy;
                    _this.tick();
                };

                var dragend=function(d, i) {
                    d3.event.subject.fx = null;
                    d3.event.subject.fy = null;
                    _this.force.restart();
                    _this.tick();
                };

                this.nodeDrag = d3.drag()
                    .on("start", dragstart)
                    .on("drag", dragmove)
                    .on("end", dragend);

                this.highlightObject=function(obj){
                    if (obj) {
                        var objIndex= obj.index;
                        dependsNode=dependsNode.concat([objIndex]);
                        dependsLinkAndText=dependsLinkAndText.concat([objIndex]);
                        defaultConfig.data.links.forEach(function(lkItem){
                            if(objIndex==lkItem['source']['index']){
                                dependsNode=dependsNode.concat([lkItem.target.index])
                            }else if(objIndex==lkItem['target']['index']){
                                dependsNode=dependsNode.concat([lkItem.source.index])
                            }
                        });
                        _this.node.classed('inactive',function(d){
                            return (dependsNode.indexOf(d.index)==-1)
                        });
                        _this.link.classed('inactive', function(d) {

                            return ((dependsLinkAndText.indexOf(d.source.index)==-1)&&(dependsLinkAndText.indexOf(d.target.index)==-1))
                        });

                        _this.linetext.classed('inactive',function(d){
                            return ((dependsLinkAndText.indexOf(d.source.index)==-1)&&(dependsLinkAndText.indexOf(d.target.index)==-1))
                        });
                    } else {
                        _this.node.classed('inactive', false);
                        _this.link.classed('inactive', false);
                        _this.linetext.classed('inactive', false);
                    }
                };
                //个体的详细信息
                this.highlightToolTip=function(obj){
                    if(obj){
                        _this.tooltip.html("<div class='title'>"+obj.id+"的资料</div><table class='detail-info'><tr><td class='td-label'>照片：</td><td>照片地址xxxxxx</td></tr>" +
                            "<tr><td class='td-label'>其他xx：</td><td>其他资料xxxx</td></tr><tr><td class='td-label'>链接：</td><td><a href='http://www.baidu.com'>www.baidu.com</a></td></tr></table>")
                            .style("left",(d3.event.pageX+40)+"px")
                            .style("top",(d3.event.pageY-40)+"px")
                            .style("opacity",1.0);
                    }else{
                        _this.tooltip.style("opacity",0.0);
                    }
                };
                //初始化详细信息的样式动画及默认展示样式
                this.tooltip=d3.select("relationship").append("div")
                    .attr("class","tooltip")
                    .attr("opacity",0.0)
                    .on('dblclick',function(){
                        d3.event.stopPropagation();
                    })
                    .on('mouseover',function(){
                        if (_this.node.mouseoutTimeout) {
                            clearTimeout(_this.node.mouseoutTimeout);
                            _this.node.mouseoutTimeout = null;
                        }
                    })
                    .on('mouseout',function(){
                        if (_this.node.mouseoutTimeout) {
                            clearTimeout(_this.node.mouseoutTimeout);
                            _this.node.mouseoutTimeout = null;
                        }
                        _this.node.mouseoutTimeout=setTimeout(function() {
                            _this.highlightToolTip(null);
                        }, 500);
                    });

                this.node = this.vis.selectAll("g.node")
                    .data(defaultConfig.data.nodes)
                    .enter().append("svg:g")
                    .attr("class", "node")
                    .call(_this.nodeDrag)
                    .on('mouseover', function(d) {
                        if (_this.node.mouseoutTimeout) {
                            clearTimeout(_this.node.mouseoutTimeout);
                            _this.node.mouseoutTimeout = null;
                        }
                        _this.highlightToolTip(d);
                    })
                    .on('mouseout', function() {
                        if (_this.node.mouseoutTimeout) {
                            clearTimeout(_this.node.mouseoutTimeout);
                            _this.node.mouseoutTimeout = null;
                        }
                        _this.node.mouseoutTimeout=setTimeout(function() {
                            _this.highlightToolTip(null);
                        }, 500);
                    })
                    .on('dblclick',function(d){
                        _this.highlightObject(d);
                        d3.event.stopPropagation();
                    });
                d3.select("relationship").on('dblclick',function(){
                    dependsNode=dependsLinkAndText=[];
                    _this.highlightObject(null);
                });

                this.node.append("svg:image")
                    .attr("class", "circle")
                    .attr("xlink:href", "images/man.png")
                    .attr("x", "-15px")
                    .attr("y", "-15px")
                    .attr("width", "30px")
                    .attr("height", "30px");

                this.node.append("svg:text")
                    .attr("class", "nodetext")
                    .attr("dy", "30px")
                    .attr('text-anchor','middle')
                    .text(function(d) { return d.id })
                    //节点人的名字颜色D3.Js第四版本
                    .attr('fill',function(d,i){
                        return _this.color(i);
                    });
                //连接线内容
                this.linetext=this.vis.selectAll('.linetext')
                    .data(defaultConfig.data.links)
                    .enter()
                    .append("text")
                    .append('avg:textPath')
                    .attr("class","linetext")
                    .attr("startOffset", "50%")
                    .attr("text-anchor", "middle")
                    .attr("xlink:href", function(d) {
                        if (d.source.index == d.target.index) {
                            return false; //不应该有指向自己的关系 异常处理
                        } else {
                            return "#" + d.source.index + "_" + d.target.index;
                        }
                    })
                    .text(function(d){
                        return d.value;  //关系文字
                    })
                    //                      .attr('fill','#18a1cf');
                    .attr('fill',function(d,i){
                        return _this.color(i);
                    })
//                      .call(d3.drag());

                this.zoomed=function(){
                    _this.vis.attr("transform", d3.event.transform);
                };


                var findMaxWeightNode=function(){
                    var baseWeight= 1,baseNode;
                    defaultConfig.data.nodes.forEach(function(item){
                        console.info(item)
                        if(item.weight>baseWeight){
                            baseWeight=item.weight
                            baseNode=item
                        }
                    });
                    return baseNode;
                };

                var arcPath=function(leftHand, d) {
                    var start = leftHand ? d.source : d.target,
                        end = leftHand ? d.target : d.source,
                        dx = end.x - start.x,
                        dy = end.y - start.y,
                        dr = Math.sqrt(dx * dx + dy * dy),
                        sweep = leftHand ? 0 : 1;
                    return "M" + start.x + "," + start.y + "A" + dr + "," + dr +
                        " 0 0," + sweep + " " + end.x + "," + end.y;
                };
                this.tick=function() {
                    _this.link.attr("d", function(d) {
                        //弧线路径位置
                        return arcPath(false, d);
                    });
                    //关系文字显示的位置
                    _this.linetext.attr("d", function(d) {
                        return arcPath(d.source.x < d.target.x, d);
                    });
                    _this.node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                };
                _this.force.on("tick", this.tick);

                // //点击增加人物关系层级
                // addLevel = function () {
                //     alert("人物关系层级增加")
                // }
                // //返回原始的状态
                // returnFirst = function (){
                //     alert("return first state")
                // }
            }
            new GroupExplorer('relationship',{
                data:json
            });

        });

    }
    render(){
        return(
            <relationship>

            </relationship>
        )
    }

}
