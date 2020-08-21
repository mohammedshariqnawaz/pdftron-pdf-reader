import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import './App.css';


function App() {
  const viewer = useRef(null);

    useEffect(() => {

        WebViewer({
          path: 'lib',
          initialDoc: './sample.pdf'
        
        }, viewer.current).then(instance =>{

          //instance.disableElements(['toolbarGroup-Insert','toolbarGroup-Edit']);
          //instance.disableElements(['freeHandToolGroupButton',]);
          const { Annotations,Tools, annotManager, docViewer } = instance;
          const GridAnnotation = function() {
            Annotations.MarkupAnnotation.call(this);
            this.Subject = 'Grid';
          };


          GridAnnotation.prototype = new Annotations.MarkupAnnotation();
          GridAnnotation.prototype.elementName = 'grid';
          //overriding the draw function

          GridAnnotation.prototype.draw = function(ctx, pageMatrix) {
            // the setStyles function is a function on markup annotations that sets up
            // certain properties for us on the canvas for the annotation's stroke thickness.
            this.setStyles(ctx, pageMatrix);
            // first we need to translate to the annotation's x/y coordinates so that it's
            // drawn in the correct location
            ctx.translate(this.X, this.Y);
            ctx.beginPath();
            //ctx.moveTo(this.Width / 2, 0);

            ctx.rect(0,0,this.Width,this.Height)
            ctx.closePath();
            ctx.fill()
            ctx.stroke()
            //ctx.translate(0 , 0)
            ctx.beginPath()
            ctx.lineTo(200,100)
            //ctx.lineTo(this.Width,0)
            

          
            
            //ctx.lineTo(this.Width, this.Height);
            //ctx.lineTo(this.Width, this.Height);

            ctx.closePath();
            //ctx.fill();
            //ctx.stroke();
          };




          //Creating the Tool 
          const GridCreateTool = function(docViewer) {
            // TriangleAnnotation is the constructor function for our annotation we defined previously
            Tools.GenericAnnotationCreateTool.call(this, docViewer, GridAnnotation);
          };

          GridCreateTool.prototype = new Tools.GenericAnnotationCreateTool();
          //UI Creation 
          const gridToolName ='AnnotationCreateGrid';
          annotManager.registerAnnotationType(GridAnnotation.prototype.elementName, GridAnnotation);

          const gridTool = new GridCreateTool(docViewer);
          instance.registerTool({
            toolName: gridToolName,
            toolObject: gridTool,
            buttonImage: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">' +
              '<path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"/>' +
              '<path fill="none" d="M0 0h24v24H0V0z"/>' +
            '</svg>',
            buttonName: 'gridToolButton',
            tooltip: 'Grid'
          }, GridAnnotation);

          instance.setHeaderItems(header => {
            const gridButton = {
              type: 'toolButton',
              toolName: gridToolName
            };
            header.push(gridButton);
          });

          docViewer.on('documentLoaded', () => {
            // set the tool mode to our tool so that we can start using it right away
            instance.setToolMode(gridToolName);
          });







          

            

         
        
        });
            
    });

  

  return (
    <div className="App">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer} style={{height: "80vh", position: "relative"}}></div>
    </div>
  );
}

export default App;
