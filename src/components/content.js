import { Carousel } from "react-bootstrap";
export default function Content() {
    return (
        <div className="container fluid">
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require("./image/img20180620170155909.jpg")}
                        alt="First slide"
                        width={900}
                        height={570}
                    />
                    <Carousel.Caption style={{ textAlign: "left", color: "red !important" }}>
                        <h1>Sắp ra mắt:</h1>
                        <h3>Hành tẩu giang hồ</h3>
                        <p>Một buổi tối trời đông một hiệp khách xuất hiện tại quán trọ Giang Sơn ...</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require("./image/truyen-kiem-hiep-hay.jpg")}
                        alt="Second slide"
                        width={900}
                        height={570}
                    />

                    <Carousel.Caption style={{ textAlign: "left" }}>
                        <h1>Sắp ra mắt</h1>
                        <h3>Thiên hạ đệ nhất kiếm</h3>
                        <p>Một kiếm xuyên tim. Kiếm khí tung hoành ba vạn dặm.Ánh kiếm lạnh buốt khắp mười chín châu...</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require("./image/Truyen-kiem-hiep-moi-nhat-2021.jpg")}
                        alt="Third slide"
                        width={900}
                        height={570}
                    />

                    <Carousel.Caption style={{ textAlign: "left" }}>
                        <h1>Sắp ra mắt:</h1>
                        <h3>Thật gần thật xa</h3>
                        <p>Nếu một ngày em rời xa anh, em sẽ không để lại cho anh một lời nào...</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};