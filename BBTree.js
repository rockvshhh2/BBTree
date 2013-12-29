(function($)
{
    $.fn.BBTree = function (options)
    {
        var ul = Create_Nodes(options.Nodes, true);
        ul.style.width = "100%";
        ul.style.height = "100%";

        //$(ul).css({ "Width": "100%", "Height": "100%" });

        this.append(ul);

        function Create_Nodes(Datas, First) {

            if (Datas) {
                if (Datas.length > 0) {
                    var ul = document.createElement("ul");

                    ul.style["list-style-type"] = "none";
                    ul.style["padding"] = "0px";

                    for (var i = 0 ; i < Datas.length ; i++) {

                        var Node = Datas[i];

                        var li = document.createElement("li");
                        li.style.margin = "0px";

                        var table = document.createElement("table");
                        table.style.width = "100%";
                        li.appendChild(table);
                        var tr = document.createElement("tr");
                        table.appendChild(tr);

                        if (First) {
                            li.style["padding-left"] = "5px";
                        }
                        else {
                            li.style["padding-left"] = "20px";
                        }

                        if (options.Checkbox) {
                            var td = document.createElement("td");
                            td.style.width = "0px";
                            tr.appendChild(td);
                            var checkbox = document.createElement("input");
                            td.appendChild(checkbox);
                            checkbox.setAttribute("type", "checkbox");
                            checkbox.setAttribute("class", "BBTreeNode_CheckBox");

                            if (Node.Checkbox_Attributes) {
                                for (var j = 0, m = Node.Checkbox_Attributes.length; j < m; j++) {
                                    checkbox.setAttribute(Node.Checkbox_Attributes[i].Name, Node.Checkbox_Attributes[i].Value);
                                }
                            }

                            $(checkbox).click(function () {

                                var Children_Checkboxs = $(this).parent().parent().parent().find(" + ul :checkbox");

                                if ($(this)[0].checked == true) {
                                    for (var i = 0 , m = Children_Checkboxs.length; i <  m; i++) {
                                        Children_Checkboxs[i].checked = true;
                                    }
                                }
                                else {
                                    for (var i = 0, m = Children_Checkboxs.length; i < m; i++) {
                                        Children_Checkboxs[i].checked = false;
                                    }
                                }

                                Checked(this);

                            });
                        }

                        var td = document.createElement("td");
                        tr.appendChild(td);

                        if (Node.NodeIcon) {
                            if (Node.NodeIcon.Url) {
                                var img = document.createElement("img");
                                td.appendChild(img);
                                img.setAttribute("src", Node.NodeIcon.Url);

                                if (Node.NodeIcon.Width) {
                                    img.style.width = Node.NodeIcon.Width + "px";
                                }
                                if (Node.NodeIcon.Height) {
                                    img.style.height = Node.NodeIcon.Height + "px";
                                }
                            }
                        }

                        var Node_Span = document.createElement("span");
                        td.appendChild(Node_Span);
                        Node_Span.innerHTML = Node.Text;
                        Node_Span.setAttribute("class", "BBTreeNode_TextSpan");
                        Node_Span.style["cursor"] = "pointer";
                        Node_Span.Children_Nodes = Node.Children;

                        if (Node.Text_Attributes) {
                            for (var j = 0, m = Node.Text_Attributes.length; j < m; j++) {
                                Node_Span.setAttribute(Node.Text_Attributes[i].Name, Node.Text_Attributes[i].Value);
                            }
                        }
                        if (Node.Text_Style) {
                            for (var j = 0, m = Node.Text_Style.length; j < m; j++) {
                                Node_Span.style[Node.Text_Style[i].Name] = Node.Text_Style[i].Value;
                            }
                        }
                       
                        if (Node.Children) {
                            if (Node.Children.length > 0) {
                                var td = document.createElement("td");
                                td.style.width = "0px";
                                var img = document.createElement("img");
                                td.appendChild(img);
                                img.style["cursor"] = "pointer";
                                img.setAttribute("class", "BBTreeChild_Icon");
                                NodeChild_Img = img;
                                img.setAttribute("src", "Image/Show.png");

                                if (options.ChildIcon) {
                                    if (options.ChildIcon.Show) {
                                        img.setAttribute("src", options.ChildIcon.Show);
                                    }

                                    if (options.ChildIcon.Width) {
                                        img.style.width = options.ChildIcon.Width + "px";
                                    }
                                    if (options.ChildIcon.Height) {
                                        img.style.height = options.ChildIcon.Height + "px";
                                    }
                                }

                                $(img).click(function () {
                                    if (this.Show) {
                                        $(this).parent().parent().parent().parent().parent().find(" ul").eq(0).show("slow");
                                        $(this).attr("src", "Image/Hide.png");
                                        if (options.ChildIcon) {
                                            if (options.ChildIcon.Hide) {
                                                img.setAttribute("src", options.ChildIcon.Hide);
                                            }
                                        }
                                        this.Show = false;
                                    }
                                    else {
                                        $(this).parent().parent().parent().parent().parent().find(" ul:eq(0)").hide("slow");
                                        $(this).attr("src", "Image/Show.png");
                                        if (options.ChildIcon) {
                                            if (options.ChildIcon.Show) {
                                                img.setAttribute("src", options.ChildIcon.Show);
                                            }
                                        }

                                        this.Show = true;
                                    }
                                });

                                var Children_Node = Create_Nodes(Node.Children);

                                if (Node.HideChildrenNode) {
                                    $(Children_Node).hide();
                                    NodeChild_Img.Show = true;
                                }
                                else {
                                    if (NodeChild_Img) {
                                        NodeChild_Img.setAttribute("src", "Image/Hide.png");
                                        NodeChild_Img.Show = false;

                                        if (Node.Child_Icon_Url_HideChild) {
                                            if (Node.Child_Icon_Url_HideChild != "") {
                                                NodeChild_Img.setAttribute("src", Node.Child_IconHideChild);
                                            }
                                        }
                                    }
                                }

                                li.appendChild(Children_Node);

                                if (Node.ChildIconPosition) {
                                    if (Node.ChildIconPosition.toLowerCase() == "right") {
                                        tr.appendChild(td);
                                    }
                                    else {
                                        $(tr).prepend(td);
                                    }
                                }
                                else {
                                    $(tr).prepend(td);
                                }
                            }
                        }

                        ul.appendChild(li);
                    }

                    return ul;
                }
            }
        }

        function Checked(input) {
            var ThisLevelPanel = $(input).parent().parent().parent().parent().parent();

            var ThisLevel_Checkboxs = ThisLevelPanel.find(" > li > table :checkbox").length;
            var ThisLevel_Checkboxed = ThisLevelPanel.find(" > li > table :checked").length;

            var ParentCheckbox = ThisLevelPanel.parent().find(" > table :checkbox");

            if (ThisLevel_Checkboxs == ThisLevel_Checkboxed) {
                if (ParentCheckbox.length > 0) {
                    ParentCheckbox[0].checked = true;
                    Checked(ParentCheckbox[0]);
                }
            }
            else {
                if (ParentCheckbox.length > 0) {
                    ParentCheckbox[0].checked = false;
                    Checked(ParentCheckbox[0]);
                }
            }
        }
    }
})(jQuery)