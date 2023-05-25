import { useGetFaqQuery } from "../services/touchpoint";
import useLoader from "../hooks/useLoader";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import Heading from "../components/Heading";
import ErrorBanner from "../components/ErrorBanner";

export default function Faq({
  title = "Complaint Desk",
  subtitle = "Find answers to your questions below",
}) {
  const { data, isLoading, error, refetch } = useGetFaqQuery(null);
  useLoader(isLoading)

  if (error) {
    return <ErrorBanner error={error} refetch={refetch} />;
  }

  return (
    <section className="page-wrapper innerpage-section-padding">
      <div id="complaint-page">
        <div className="container-fluid text-center">
          <Heading title={title} subtitle={subtitle} />
          <div className="no-back">
            <div className="row">
              <div className="col-sm-12 offset-lg-2 col-lg-8">
                <Accordion>
                  {data?.map((item) => (
                    <AccordionItem key={item.id} header={item.question}>
                      {item.answer}
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
