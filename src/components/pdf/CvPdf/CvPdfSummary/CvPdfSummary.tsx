import { Link, Text, View } from '@react-pdf/renderer';
import type { ReactNode } from 'react';

import { sanitizeHtmlFragment } from '@/utils/sanitizeHtml';
import { styles } from './CvPdfSummary.styles';

interface CvPdfSummaryProps {
    content: string;
    title: string;
}

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;

const renderInlineNode = (node: ChildNode, key: string): ReactNode => {
    if (node.nodeType === TEXT_NODE) {
        return node.textContent;
    }

    if (node.nodeType !== ELEMENT_NODE) {
        return null;
    }

    const element = node as Element;
    const tagName = element.tagName.toLowerCase();
    const children = Array.from(element.childNodes).map((child, index) =>
        renderInlineNode(child, `${key}-${index}`),
    );

    if (tagName === 'strong' || tagName === 'b') {
        return (
            <Text key={key} style={styles.bold}>
                {children}
            </Text>
        );
    }

    if (tagName === 'em' || tagName === 'i') {
        return (
            <Text key={key} style={styles.italic}>
                {children}
            </Text>
        );
    }

    if (tagName === 'u') {
        return (
            <Text key={key} style={styles.underline}>
                {children}
            </Text>
        );
    }

    if (tagName === 'a') {
        const href = element.getAttribute('href');

        return href ? (
            <Link key={key} src={href} style={styles.link}>
                {children}
            </Link>
        ) : (
            children
        );
    }

    if (tagName === 'br') {
        return '\n';
    }

    return children;
};

const renderList = (element: Element, key: string) => {
    const items = Array.from(element.children).filter(
        (child) => child.tagName.toLowerCase() === 'li',
    );
    const isOrdered = element.tagName.toLowerCase() === 'ol';

    return (
        <View key={key} style={styles.list}>
            {items.map((item, index) => (
                <View key={`${key}-${index}`} style={styles.listItem}>
                    <Text style={styles.listMarker}>
                        {isOrdered ? `${index + 1}.` : '-'}
                    </Text>
                    <Text style={styles.listContent}>
                        {Array.from(item.childNodes).map((child, childIndex) =>
                            renderInlineNode(
                                child,
                                `${key}-${index}-${childIndex}`,
                            ),
                        )}
                    </Text>
                </View>
            ))}
        </View>
    );
};

const renderBlockNode = (node: ChildNode, index: number): ReactNode => {
    const key = `summary-${index}`;

    if (node.nodeType === TEXT_NODE) {
        const content = node.textContent?.trim();

        return content ? (
            <Text key={key} style={styles.paragraph}>
                {content}
            </Text>
        ) : null;
    }

    if (node.nodeType !== ELEMENT_NODE) {
        return null;
    }

    const element = node as Element;
    const tagName = element.tagName.toLowerCase();

    if (tagName === 'ul' || tagName === 'ol') {
        return renderList(element, key);
    }

    return (
        <Text key={key} style={styles.paragraph}>
            {renderInlineNode(element, key)}
        </Text>
    );
};

export const CvPdfSummary = ({ content, title }: CvPdfSummaryProps) => {
    const fragment = sanitizeHtmlFragment(content);

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {Array.from(fragment.childNodes).map(renderBlockNode)}
        </View>
    );
};
