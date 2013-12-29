BBTree : 
David.Huang
rockvshhh2@hotmail.com
BBTree is a multi-functional 'tree plug-ins.' based on jQuery. 


How do use :
$("Selector").BBTree({Options});


API Documents : 
Option : {
Nodes: [
    {
    Text: string, // Node's Span Tag Text
    Text_Attributes: Array(Obj), // Node's Span Tag Attributes, Obj: { Name : HTML Attribute Name ,Value : Attribute Value }
    Text_Style: Array(Obj), // Node's Span Tag CSS, Obj: { Name : HTML CSS Name ,Value : CSS Value }
    
    Checkbox_Attributes: Array(Obj), // Node's Span Tag Attributes, Obj: { Name : HTML Attribute Name ,Value : Attribute Value }
    HideChildrenNode: false, // Display this Node Children
    ChildIconPosition:left(string) //Right,Left
    NodeIcon:Obj, // Obj:{ Url : string ,  Width : number // px , Height : number // px }
    Children: Array // Array of child nodes.
],
Checkbox: false, // Suppress checkbox display for this node.
ChildIcon:Obj // Obj:{ Show:url // show children icon,Hide:url // hide children icon,Width:number // px,Height:number // px }
}
