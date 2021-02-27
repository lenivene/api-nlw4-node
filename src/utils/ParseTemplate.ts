import path from "path";
import fs from "fs";
import handlebars from "handlebars";

export const ParseTemplate = (context: any, ...pathTemplateSegments: string[]) => {
  const templateLocation = path.resolve(process.cwd(),  'src', 'views', ...pathTemplateSegments);
  const templateFileContent = fs.readFileSync(templateLocation).toString("utf-8");

  const templateParse = handlebars.compile(templateFileContent);
  const templateContent = templateParse(context);

  return templateContent;
}