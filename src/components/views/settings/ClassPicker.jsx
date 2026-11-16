import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { CLASS_CATALOG } from "../../../data/classes";

// One row of the "My Classes" setting: shows the class picked for a period, and
// opens a search box + results list underneath when clicked.
// The list opens in the normal page flow (it pushes the rows below it down) on purpose,
// so it can never get cut off by the edge of the settings modal.

// Flat list of every class, with the text we search against pre-built.
const ALL_CLASSES = CLASS_CATALOG.flatMap(({ department, classes }) =>
    classes.map((name) => ({
        name,
        department,
        key: `${department}|${name}`,
        searchText: `${name} ${department}`.toLowerCase(),
    }))
);

// Every word the user typed has to appear somewhere in the class name or its department,
// so "ap chem", "chem ap" and "science ap" all find AP Chemistry.
const searchClasses = (query) => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return ALL_CLASSES;
    return ALL_CLASSES.filter((item) => words.every((word) => item.searchText.includes(word)));
};

const ClassPicker = ({ periodNumber, value, isOpen, onToggle, onSelect }) => {
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef(null);
    const listRef = useRef(null);

    const results = useMemo(() => searchClasses(query), [query]);
    const listId = `periodClassList${periodNumber}`;

    // Start fresh and put the cursor in the search box every time the picker opens
    useEffect(() => {
        if (isOpen) {
            setQuery("");
            setActiveIndex(0);
            inputRef.current?.focus();
        }
    }, [isOpen]);

    // Keep the highlighted result visible while arrowing through the list
    useEffect(() => {
        if (!isOpen) return;
        listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
    }, [activeIndex, isOpen]);

    const choose = (className) => {
        onSelect(className);
        onToggle(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((index) => Math.min(index + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((index) => Math.max(index - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (results[activeIndex]) choose(results[activeIndex].name);
        } else if (e.key === "Escape") {
            // close just the picker, not the whole settings modal
            e.preventDefault();
            e.stopPropagation();
            onToggle(false);
        }
    };

    return (
        <Box>
            <Flex justify="space-between" align="center">
                <Box fontSize="sm" color="var(--text-secondary)" width="30%">
                    Period {periodNumber}
                </Box>
                <Flex width="65%" gap={2} align="center">
                    <Flex
                        as="button"
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={listId}
                        aria-label={`Class for period ${periodNumber}: ${value || "none chosen"}`}
                        onClick={() => onToggle(!isOpen)}
                        flex="1"
                        minWidth={0}
                        px={3}
                        py={1}
                        borderRadius="md"
                        align="center"
                        justify="space-between"
                        gap={2}
                        textAlign="left"
                        bg="var(--accent-background)"
                        color={value ? "var(--text-primary)" : "var(--text-secondary)"}
                        outline={isOpen ? "2px solid var(--color-primary)" : "none"}
                    >
                        <Text fontSize="sm" marginBottom={0} noOfLines={1}>
                            {value || "Choose a class"}
                        </Text>
                        <i className={isOpen ? "bi bi-chevron-up" : "bi bi-chevron-down"}></i>
                    </Flex>
                    {value && (
                        <Box
                            as="button"
                            type="button"
                            aria-label={`Clear class for period ${periodNumber}`}
                            title="Clear"
                            onClick={() => choose("")}
                            px={2}
                            py={1}
                            borderRadius="md"
                            bg="var(--accent-background)"
                            color="var(--text-secondary)"
                        >
                            <i className="bi bi-x-lg"></i>
                        </Box>
                    )}
                </Flex>
            </Flex>

            {isOpen && (
                <Box mt={2} p={2} borderRadius="md" border="1px solid var(--accent-background)">
                    <Input
                        ref={inputRef}
                        size="sm"
                        borderRadius="md"
                        placeholder="Search classes..."
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setActiveIndex(0);
                        }}
                        onKeyDown={handleKeyDown}
                        role="combobox"
                        aria-expanded="true"
                        aria-controls={listId}
                        aria-autocomplete="list"
                        aria-label={`Search classes for period ${periodNumber}`}
                        borderColor="var(--accent-background)"
                        focusBorderColor="var(--color-primary)"
                        mb={2}
                    />
                    <Box ref={listRef} id={listId} role="listbox" maxHeight="200px" overflowY="auto">
                        {results.length === 0 ? (
                            <Text fontSize="sm" color="var(--text-secondary)" p={2} marginBottom={0}>
                                No classes match "{query}"
                            </Text>
                        ) : (
                            results.map((item, index) => {
                                const active = index === activeIndex;
                                return (
                                    <Flex
                                        key={item.key}
                                        role="option"
                                        aria-selected={item.name === value}
                                        data-active={active}
                                        onClick={() => choose(item.name)}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        justify="space-between"
                                        align="center"
                                        gap={3}
                                        px={2}
                                        py={1.5}
                                        borderRadius="md"
                                        cursor="pointer"
                                        bg={active ? "var(--color-primary)" : "transparent"}
                                        color={active ? "var(--text-contrast)" : "var(--text-primary)"}
                                    >
                                        <Text fontSize="sm" marginBottom={0}>
                                            {item.name === value && <i className="bi bi-check2" style={{ marginRight: "6px" }}></i>}
                                            {item.name}
                                        </Text>
                                        <Text fontSize="xs" marginBottom={0} opacity={0.7} flexShrink={0} textAlign="right">
                                            {item.department}
                                        </Text>
                                    </Flex>
                                );
                            })
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ClassPicker;
