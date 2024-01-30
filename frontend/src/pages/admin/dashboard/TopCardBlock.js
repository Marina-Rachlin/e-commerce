const TopCardBlock = () => {
    const cardContent = [
      {
        id: 1,
        icon: "flaticon-briefcase",
        countNumber: "22",
        metaName: "New Users",
        uiClass: "ui-blue",
      },
      {
        id: 2,
        icon: "la-file-invoice",
        countNumber: "382",
        metaName: "New Products",
        uiClass: "ui-red",
      },
      {
        id: 3,
        icon: "la-comment-o",
        countNumber: "74",
        metaName: "New Orders",
        uiClass: "ui-yellow",
      },
      {
        id: 4,
        icon: "la-bookmark-o",
        countNumber: "32",
        metaName: "New Reviews",
        uiClass: "ui-green",
      },
    ];
  
    return (
      <>
        {cardContent.map((item, index) => (
          <div
            className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
            key={item.id}
          >
            <div className={`ui-item ${item.uiClass}`}>
              <div className="left">
                <i className={`icon la ${item.icon}`}></i>
              </div>
              <div className="right">
                <h4>{item.countNumber}</h4>
                <p>{item.metaName}</p>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };
  
  export default TopCardBlock;
  