package org.schemaspy.view;

import org.schemaspy.output.html.HtmlException;
import java.io.IOException;
import java.io.Writer;


public class HtmlChangelogPage {
    private final MustacheCompiler mustacheCompiler;

    public HtmlChangelogPage(MustacheCompiler mustacheCompiler) {
        this.mustacheCompiler = mustacheCompiler;
    }

    public void write(Writer writer) {
        PageData pageData = createPageData();
        try {
            mustacheCompiler.write(pageData, writer);
        } catch (IOException e) {
            throw new HtmlException("Failed to write changelog page", e);
        }
    }

    private PageData createPageData() {
        return new PageData.Builder()
            .templateName("changelog.html")
            .scriptName("changelog.js")
            .getPageData();
    }
}
