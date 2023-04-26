import { SIZES } from "../config";

const Tabs = ({ description }) => {
  const tabs = [
    { key: "description", title: "Description" },
    { key: "size", title: "Size Examples" },
  ];
  
  return (
    <div class="row my-4">
      <div class="offset-lg-2 col-lg-8">
        <ul class="nav nav-tabs justify-content-start">
          <li class="nav-item">
            <a class="nav-link active" href="#description" data-toggle="tab">
              Description
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#size" data-toggle="tab">
              Size Examples
            </a>
          </li>
        </ul>

        <div class="tab-content">
          <div id="description" class="tab-pane active">
            <div
              class="my-4"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          </div>
          <div id="size" class="tab-pane">
            <div
              id="img-tab"
              class="nav nav-pills my-4 justify-content-center"
              role="tablist"
            >
              {SIZES.map((size) => (
                <a
                  href={`#${size.id}`}
                  class="nav-item nav-link active"
                  data-toggle="tab"
                  role="tab"
                >
                  {size.label}
                </a>
              ))}
            </div>
            <div class="tab-content my-5">
              {SIZES.map((size) => (
                <div class="tab-pane active" id={size.id} role="tabpanel">
                  <img class="img-fluid" src={size.image} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
