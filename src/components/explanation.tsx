import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface SubSection {
  subtitle: string;
  items: string[];
}

interface Step {
  title: string;
  paragraphs: string[];
  subSections: SubSection[];
  extraParagraphs?: string[];
}

interface Props {
  steps: Step[];
}

export const ProjectExplanation = ({ steps }: Props) => (
  <Box sx={{ mt: 4 }}>
    {steps.map((step, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: idx * 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            {step.title}
          </Typography>
          {step.paragraphs.map((p, i) => (
            <Typography key={i} variant="body1" paragraph>
              {p}
            </Typography>
          ))}
          {step.subSections.map((sub, j) => (
            <Box key={j} sx={{ mt: 2 }}>
              {sub.subtitle && sub.items.length === 1 ? (
                <>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {sub.subtitle}
                  </Typography>
                  <Typography variant="body1">{sub.items[0]}</Typography>
                </>
              ) : !sub.subtitle && sub.items.length === 1 ? (
                <Typography variant="body1">{sub.items[0]}</Typography>
              ) : (
                <>
                  {sub.subtitle && (
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {sub.subtitle}
                    </Typography>
                  )}
                  <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                    {sub.items.map((item, k) => (
                      <li key={k}>
                        <Typography variant="body2">{item}</Typography>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Box>
          ))}
          {step.extraParagraphs?.map((p, i) => (
            <Typography key={`extra-${i}`} variant="body1" sx={{ mt: 2 }}>
              {p}
            </Typography>
          ))}
        </Box>
      </motion.div>
    ))}
  </Box>
);
