import Header from "../components/header/header";
import Slider from "../components/slider/slider";

export default function Index({ params }: any) {
  return (
    <>
      <Header locale={params.locale} />
      <Slider />
    </>
  );
}
