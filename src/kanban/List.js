import React, { Component, Fragment } from "react";
class List extends Component {
  state = { draggableList: false };
  render() {
    const {
      children,
      name,
      _id,
      onSetListTargetOption,
      listIndex,
      listTarget,
      onListMove,
      onListDragEnd,
      listTargetId,
      draggable,
      volunteersLength
    } = this.props;
    const { draggableList } = this.state;
    return (
      <span className="list-warper">
        <span
          className="list-body"
          onDragEnterCapture={() => {
            listTarget === "list" && onListMove(listIndex);
          }}
          onDragEnd={e => {
            listTarget === "list" && onListDragEnd(e, _id, listIndex);
          }}
          style={{ opacity: listTargetId === _id && "0.3" }}
          id="list"
          draggable={draggableList && draggable}
          onDragStart={e => onSetListTargetOption(e, _id)}
        >
          <div
            className="list-header"
            onMouseDown={() => this.setState({ draggableList: true })}
            onMouseUp={() => {
              this.setState({ draggableList: false });
            }}
          >
            <div className="list-title">
              <Fragment>
                {name}
                {volunteersLength > 0 && (
                  <span
                    style={{
                      fontSize: "14px",
                      paddingLeft: "5px"
                    }}
                  >
                    {volunteersLength}
                  </span>
                )}
              </Fragment>
            </div>
          </div>
          <div className="list-list">{children}</div>
        </span>
      </span>
    );
  }
}
export default List;
