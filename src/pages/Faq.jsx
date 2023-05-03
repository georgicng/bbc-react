import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import ErrorBanner from "../components/ErrorBanner";
import { useGetFaqQuery } from "../services/faq";
import Heading from "../components/Heading";

export default function Faq({
  title = "Complaint Desk",
  subtitle = "Find answers to your questions below",
}) {
  const { data, isLoading, error, refetch } = useGetFaqQuery(null);

  if (isLoading) {
    return <div>Loading faqs...</div>;
  }

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
                  {data.map((item) => (
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
