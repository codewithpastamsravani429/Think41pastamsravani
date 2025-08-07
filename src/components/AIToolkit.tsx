import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Settings, Wand2, FileText, Workflow, Plus, Save, Trash2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  prompt: string;
  description: string;
}

interface WorkflowStep {
  id: string;
  name: string;
  prompt: string;
  order: number;
}

const AIToolkit = () => {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Text refinement
  const [inputText, setInputText] = useState("");
  const [refinedText, setRefinedText] = useState("");
  const [refinementType, setRefinementType] = useState("improve");
  
  // Prompt templates
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "",
    prompt: "",
    description: ""
  });
  
  // Content generation
  const [contentPrompt, setContentPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [contentType, setContentType] = useState("blog");
  
  // Multi-step workflows
  const [workflows, setWorkflows] = useState<WorkflowStep[]>([]);
  const [workflowInput, setWorkflowInput] = useState("");
  const [workflowResults, setWorkflowResults] = useState<string[]>([]);

  useEffect(() => {
    // Load saved data from localStorage
    const savedApiKey = localStorage.getItem("ai-api-key");
    const savedTemplates = localStorage.getItem("ai-templates");
    
    if (savedApiKey) setApiKey(savedApiKey);
    if (savedTemplates) setTemplates(JSON.parse(savedTemplates));
  }, []);

  const saveApiKey = () => {
    localStorage.setItem("ai-api-key", apiKey);
    toast.success("API key saved securely in your browser");
  };

  const callOpenAI = async (prompt: string) => {
    if (!apiKey) {
      toast.error("Please enter your OpenAI API key first");
      return "";
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4-turbo-preview",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      toast.error("API call failed. Check your API key and try again.");
      return "";
    }
  };

  const refineText = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    const refinementPrompts = {
      improve: `Improve the following text by making it clearer, more engaging, and better structured:\n\n${inputText}`,
      professional: `Rewrite the following text in a professional tone:\n\n${inputText}`,
      casual: `Rewrite the following text in a casual, friendly tone:\n\n${inputText}`,
      concise: `Make the following text more concise while keeping the key points:\n\n${inputText}`,
      expand: `Expand on the following text with more details and examples:\n\n${inputText}`
    };

    const result = await callOpenAI(refinementPrompts[refinementType as keyof typeof refinementPrompts]);
    setRefinedText(result);
    setIsLoading(false);
  };

  const generateContent = async () => {
    if (!contentPrompt.trim()) return;
    
    setIsLoading(true);
    const contentPrompts = {
      blog: `Write a comprehensive blog post about: ${contentPrompt}. Include an engaging introduction, detailed sections, and a compelling conclusion.`,
      email: `Write a professional email about: ${contentPrompt}. Make it clear, concise, and action-oriented.`,
      social: `Create an engaging social media post about: ${contentPrompt}. Make it attention-grabbing and shareable.`,
      copy: `Write compelling marketing copy for: ${contentPrompt}. Focus on benefits and include a clear call-to-action.`
    };

    const result = await callOpenAI(contentPrompts[contentType as keyof typeof contentPrompts]);
    setGeneratedContent(result);
    setIsLoading(false);
  };

  const saveTemplate = () => {
    if (!newTemplate.name || !newTemplate.prompt) {
      toast.error("Please fill in name and prompt");
      return;
    }

    const template: PromptTemplate = {
      id: Date.now().toString(),
      ...newTemplate
    };

    const updatedTemplates = [...templates, template];
    setTemplates(updatedTemplates);
    localStorage.setItem("ai-templates", JSON.stringify(updatedTemplates));
    
    setNewTemplate({ name: "", category: "", prompt: "", description: "" });
    toast.success("Template saved!");
  };

  const deleteTemplate = (id: string) => {
    const updatedTemplates = templates.filter(t => t.id !== id);
    setTemplates(updatedTemplates);
    localStorage.setItem("ai-templates", JSON.stringify(updatedTemplates));
    toast.success("Template deleted");
  };

  const addWorkflowStep = () => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      name: `Step ${workflows.length + 1}`,
      prompt: "",
      order: workflows.length
    };
    setWorkflows([...workflows, newStep]);
  };

  const runWorkflow = async () => {
    if (!workflowInput.trim() || workflows.length === 0) return;
    
    setIsLoading(true);
    const results: string[] = [];
    let currentInput = workflowInput;

    for (const step of workflows.sort((a, b) => a.order - b.order)) {
      const prompt = step.prompt.replace("{input}", currentInput);
      const result = await callOpenAI(prompt);
      results.push(result);
      currentInput = result; // Use previous result as input for next step
    }

    setWorkflowResults(results);
    setIsLoading(false);
  };

  return (
    <div id="ai-toolkit" className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-hero bg-clip-text text-transparent">AI Writing Toolkit</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Refine, generate, and perfect your content with AI
          </p>
        </div>

        {/* API Key Setup */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              API Configuration
            </CardTitle>
            <CardDescription>
              Enter your OpenAI API key to enable AI features. It's stored securely in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={saveApiKey} variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save Key
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="refine" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="refine" className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              Text Refinement
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Generate Content
            </TabsTrigger>
            <TabsTrigger value="workflow" className="flex items-center gap-2">
              <Workflow className="w-4 h-4" />
              Workflows
            </TabsTrigger>
          </TabsList>

          {/* Text Refinement */}
          <TabsContent value="refine">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Input Text</CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    {["improve", "professional", "casual", "concise", "expand"].map((type) => (
                      <Badge
                        key={type}
                        variant={refinementType === type ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setRefinementType(type)}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter text to refine..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-32 mb-4"
                  />
                  <Button onClick={refineText} disabled={isLoading} className="w-full">
                    {isLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                    Refine Text
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Refined Text</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={refinedText}
                    readOnly
                    className="min-h-32"
                    placeholder="Refined text will appear here..."
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Prompt Templates */}
          <TabsContent value="templates">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Create Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Template name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  />
                  <Input
                    placeholder="Category"
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                  />
                  <Input
                    placeholder="Description"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                  />
                  <Textarea
                    placeholder="Prompt template..."
                    value={newTemplate.prompt}
                    onChange={(e) => setNewTemplate({...newTemplate, prompt: e.target.value})}
                    className="min-h-24"
                  />
                  <Button onClick={saveTemplate} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Saved Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {templates.map((template) => (
                      <div key={template.id} className="p-3 border border-border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{template.name}</h4>
                            {template.category && (
                              <Badge variant="outline" className="text-xs">
                                {template.category}
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTemplate(template.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                        <p className="text-xs font-mono bg-muted p-2 rounded truncate">
                          {template.prompt}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Generation */}
          <TabsContent value="generate">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Content Generation</CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    {["blog", "email", "social", "copy"].map((type) => (
                      <Badge
                        key={type}
                        variant={contentType === type ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setContentType(type)}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe what you want to create..."
                    value={contentPrompt}
                    onChange={(e) => setContentPrompt(e.target.value)}
                    className="min-h-32 mb-4"
                  />
                  <Button onClick={generateContent} disabled={isLoading} className="w-full">
                    {isLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                    Generate Content
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Generated Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={generatedContent}
                    readOnly
                    className="min-h-32"
                    placeholder="Generated content will appear here..."
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Multi-step Workflows */}
          <TabsContent value="workflow">
            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Workflow Steps</CardTitle>
                  <Button onClick={addWorkflowStep} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Step
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workflows.map((step, index) => (
                      <div key={step.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge>{index + 1}</Badge>
                          <Input
                            placeholder="Step name"
                            value={step.name}
                            onChange={(e) => {
                              const updated = workflows.map(w => 
                                w.id === step.id ? {...w, name: e.target.value} : w
                              );
                              setWorkflows(updated);
                            }}
                            className="flex-1"
                          />
                        </div>
                        <Textarea
                          placeholder="Prompt for this step (use {input} for previous result)"
                          value={step.prompt}
                          onChange={(e) => {
                            const updated = workflows.map(w => 
                              w.id === step.id ? {...w, prompt: e.target.value} : w
                            );
                            setWorkflows(updated);
                          }}
                          className="min-h-20"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle>Workflow Input</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Enter initial input for the workflow..."
                      value={workflowInput}
                      onChange={(e) => setWorkflowInput(e.target.value)}
                      className="min-h-32 mb-4"
                    />
                    <Button onClick={runWorkflow} disabled={isLoading} className="w-full">
                      {isLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Workflow className="w-4 h-4 mr-2" />}
                      Run Workflow
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle>Workflow Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {workflowResults.map((result, index) => (
                        <div key={index} className="p-3 border border-border rounded-lg">
                          <Badge className="mb-2">Step {index + 1}</Badge>
                          <p className="text-sm">{result}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIToolkit;