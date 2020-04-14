import React from 'react';
import colors from '../colors';

export class Board extends React.Component {

   columnStyle = {
      float: "left"
   };

   rowStyle = {
      position: 'relative',
   }

   homeStyle = {
      border: '1px solid #555',
      width: '50px',
      height: '200px',
      lineHeight: '50px',
      textAlign: 'center',
      backgroundColor: '#D3D3D3',
   };

   pokeyStyle = {
      border: '1px solid #555',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      textAlign: 'center',
      backgroundColor: '#D3D3D3',
   };

   pointStyle = {
      width: '50px',
      height: '200px',
      lineHeight: '50px',
      textAlign: 'center',
      position: 'relative',
   };

   bottomTriangleDark = {
      backgroundColor: '#808080',
      clipPath: "polygon(50% 0, 0 100%, 100% 100%)"
   };

   bottomTriangleLight = {
      backgroundColor: '#DCDCDC',
      clipPath: "polygon(50% 0, 0 100%, 100% 100%)"
   }

   topTriangleDark = {
      backgroundColor: '#808080',
      clipPath: "polygon(50% 100%, 0 0, 100% 0)"
   };

   topTriangleLight = {
      backgroundColor: '#DCDCDC',
      clipPath: "polygon(50% 100%, 0 0, 100% 0)"
   };

   bottomPointLight = {...this.pointStyle,...this.bottomTriangleLight};
   bottomPointDark = {...this.pointStyle,...this.bottomTriangleDark};
   topPointLight = {...this.pointStyle,...this.topTriangleLight};
   topPointDark = {...this.pointStyle,...this.topTriangleDark};

   getPointStyle(i,j) {
      if (i === 0) {
         if (j % 2 === 0) {
            return this.topPointLight;
         } else {
            return this.topPointDark;
         }
      } else {
         if (j % 2 === 0) {
            return this.bottomPointDark;
         } else {
            return this.bottomPointLight;
         }
      }
   }

   getSpotPiece(section, id, row) {
      let sectionArray = [];
      if (section === "points") {
         sectionArray = this.props.G.points;
      } else if (section === "home") {
         sectionArray = this.props.G.home;
      } else if (section === "pokey") {
         sectionArray = this.props.G.pokey;
      }
      let spot = sectionArray[id]
      if (spot) return <div style={this.getPieceStyle(section,row,spot.color)}>{spot.count}</div>
      return "";
   }

   piece = {
      position: "relative",
      textAlign: "center",
      borderRadius: "50%",
      left: "4px",
      top: "0px",
      width: "40px",
      height: "40px",
      lineHeight: "40px",
   };

   topPointPiecePosition = {
      top: "-80px",
   }

   bottomPointPiecePosition = {
      top: "80px",
   }

   blackPiece = {
      background: colors["0"],
      color: "white"
   }

   whitePiece = {
      background: colors["1"],
      color: "white",
   }

   blackPiece = {...this.piece,...this.blackPiece};
   whitePiece = {...this.piece,...this.whitePiece};

   getPieceStyle(section, row, color) {
      if (section === "points") {
         if (color === "b") {
            if (row === 0) {
               return {...this.blackPiece,...this.topPointPiecePosition};
            } else {
               return {...this.blackPiece, ...this.bottomPointPiecePosition};
            }
         } else if (color === "w") {
            if (row === 0) {
               return {...this.whitePiece, ...this.topPointPiecePosition};
            } else {
               return {...this.whitePiece, ...this.bottomPointPiecePosition};
            }
         } 
      } else if (color === "b") {
         return this.blackPiece;
      } else {
         return this.whitePiece;
      }
   }

   onClick(section, id) {
      if (this.props.G.dice !== null) {
         this.props.moves.clickCell(section, id);
      }
   }

   render() {
      let leftPointsBody = [];
      let rightPointsBody = [];
      for (let i = 0; i < 2; i++) {
         let leftPoints = [];
         let rightPoints = [];
         for (let j = 0; j < 12; j++) {
            const id = 12 * i + j
            if (j < 6) {
               leftPoints.push(
                  <td style={this.getPointStyle(i,j)} key={id} onClick={() => this.onClick("points", id)}>
                     {this.getSpotPiece("points", id, i)}
                  </td>
               );
            } else {
               rightPoints.push(
                  <td style={this.getPointStyle(i,j)} key={id} onClick={() => this.onClick("points", id)}>
                     {this.getSpotPiece("points", id, i)}
                  </td>
               );
            }
         }
         leftPointsBody.push(<tr key="0" style={this.rowStyle}>{leftPoints}</tr>);
         rightPointsBody.push(<tr key="1" style={this.rowStyle}>{rightPoints}</tr>);
      }

      return (
<React.Fragment>
   <div style={this.columnStyle} class="column">
      <table id="home">
         <tbody>
            <tr key="home0">
               <td style={this.homeStyle} key="0" onClick={() => this.onClick("home", 0)}>
                  {this.getSpotPiece("home", 0, 0)}
               </td>
            </tr>
            <tr key="home1">
               <td style={this.homeStyle} key="1" onClick={() => this.onClick("home", 1)}>
                  {this.getSpotPiece("home", 1, 1)}
               </td>
            </tr>
         </tbody>
      </table>
   </div>
   <div style={this.columnStyle} class="column">
      <table id="leftBoard">
         <tbody>{leftPointsBody}</tbody>
      </table>
   </div>
   <div style={this.columnStyle} class="column">
      <table id="pokey">
         <tbody>
            <tr key="pokey0">
               <td style={this.pokeyStyle} key="0" onClick={() => this.onClick("pokey", 0)}>
                  {this.getSpotPiece("pokey", 0, 0)}
               </td>
            </tr>
            <tr key="pokey1">
               <td style={this.pokeyStyle} key="1" onClick={() => this.onClick("pokey", 1)}>
                  {this.getSpotPiece("pokey", 1, 1)}
               </td>
            </tr>
         </tbody>
      </table>
   </div>
   <div style={this.columnStyle} class="column">
      <table id="rightBoard">
         <tbody>{rightPointsBody}</tbody>
      </table>
   </div>
</React.Fragment>
      )
   }

}
